// Importa os valores das enums, como TileValues.EMPTY e as categorias de objetos.
// Em JS, não importamos tipos, apenas valores.
import { CategoryValues, TileValues } from "./types";


// Importa a função que nos dá acesso aos dados dos tiles e a constante de ID vazio.
import { getPropsByCategory, VOID_ID } from "./tileService";
import { generateFloors } from "./floor";
import { getBestWalls } from "./walls";

// Importa as duas principais funções de otimização dos outros arquivos.
// import { getBestWalls } from './walls';
// import { generateFloors } from './floor';

/**
 * Função essencial de pré-processamento. Pega uma camada com vários tipos de materiais
 * (ex: piso de madeira e cimento misturados) e a separa em múltiplas grades,
 * uma para cada tipo de material. É como separar um saco de LEGOs por cor.
 * @param {Array<Array<string|number>>} layer A grade original com múltiplos IDs de tiles.
 * @returns {object} Um objeto (dicionário) onde cada chave é um ID de material (ex: "cimento")
 * e o valor é uma grade binária (array de arrays de 0s e 1s) apenas para aquele material.
 */
export function splitMaterials(layer) {
    // Inicializa um objeto vazio para guardar as grades separadas.
    const materials = {};

    // Pega as dimensões da camada de entrada.
    const height = layer.length;
    if (height === 0) return {};

    const width = layer[0].length;

    // Itera sobre cada célula da camada original.
    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {
            // Pega o ID do tile na célula atual, garantindo que seja uma string.
            const tileId = String(layer[y][x]);

            // Ignora os tiles vazios.
            if (tileId !== VOID_ID) {

                // Se esta é a primeira vez que vemos este tipo de material...
                if (!materials[tileId]) {

                    // ...nós criamos uma nova entrada no nosso objeto. O valor é uma nova grade
                    // do mesmo tamanho, mas toda preenchida com 0 (EMPTY).
                    materials[tileId] = Array(height).fill(0).map(() => Array(width).fill(TileValues.EMPTY));

                }
                
                // Marca a posição (x, y) na grade específica daquele material como 1 (TILE).
                materials[tileId][y][x] = TileValues.TILE;
            }
        }

    }

    // Retorna o objeto com todas as grades de materiais separadas.
    return materials;
}

/**
 * Processa as camadas de objetos (mobília, utensílios, etc.).
 * A lógica aqui é mais simples: apenas pegamos os objetos que têm um ID "principal" (âncora),
 * ignorando as partes secundárias de objetos maiores.
 * @param {Array<Array<string|number>>} layer A grade da camada de objeto a ser processada.
 * @param {string} category A categoria do objeto (ex: "furniture") para sabermos quais são os IDs principais.
 * @returns {Array<object>} Uma lista de objetos otimizados para aquela camada.
 */

function convertObjectLayer(layer, category) {
    // Inicializa a lista de resultados.
    const objects = [];

    // Pede ao 'tileService' o nosso dicionário de propriedades de tiles.
    const propsByCategory = getPropsByCategory();

    // Pega a lista de propriedades apenas para a categoria que nos interessa.
    const categoryProps = propsByCategory[category];

    // Se não houver nenhuma propriedade para esta categoria, retorna a lista vazia.
    if (!categoryProps) return [];

    // Cria um 'Set' (conjunto) com todos os IDs principais para uma busca mais rápida e eficiente.
    const mainIds = new Set(categoryProps.map(prop => prop.code));

    // Pega as dimensões da camada.
    const height = layer.length;
    if (height === 0) return [];
    const width = layer[0].length;

    // Itera sobre cada célula da camada.
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // Pega o ID do objeto na célula atual.
            const id = String(layer[y][x]);

            // Se o ID desta célula estiver na nossa lista de IDs principais...
            if (mainIds.has(id)) {
                // ...cria um novo objeto otimizado e o adiciona à lista de resultados.
                objects.push({ type: id, pos: [x, y] });
            }
        }
    }
    // Retorna a lista de objetos filtrada.
    return objects;
}

/**
 * Função "de ordem superior" que serve como um orquestrador para paredes e pisos.
 * Ela encapsula o padrão "dividir por material -> otimizar -> juntar resultados".
 * @param {Array<Array<string|number>>} layer A grade da camada (walls ou floor).
 * @param {function} optimizationFunc A função de otimização a ser aplicada (getBestWalls ou generateFloors).
 * @returns {Array<object>} Uma lista de tiles otimizados combinados de todos os materiais.
 */
function applyTileConversion(layer, optimizationFunc) {
    // 1. DIVIDIR: Separa a camada em grades por material.
    const materialGrids = splitMaterials(layer);

    // Inicializa o array que guardará todos os resultados combinados.
    const allTiles = [];

    // Itera sobre cada material que foi encontrado.
    for (const materialId in materialGrids) {

        // Pega a grade binária para o material atual.
        const grid = materialGrids[materialId];

        // 2. OTIMIZAR: Chama a função de otimização (getBestWalls ou generateFloors) nesta grade simples.
        const optimizedTiles = optimizationFunc(grid);

        // Os resultados da otimização não sabem qual era o material. Nós adicionamos essa informação de volta.
        for (const tile of optimizedTiles) {

            // Define o tipo do tile (ex: "cimento", "madeira").
            tile.type = materialId;

            // 3. JUNTAR: Adiciona o tile, agora completo, à nossa lista de resultados finais.
            allTiles.push(tile);

        }

    }
    // Retorna a lista completa com os tiles otimizados de todos os materiais.
    return allTiles;
}

/**
 * A função "mestre" que converte um E3Map (bruto) em um OptimizedMap (final).
 * É o ponto de entrada principal para a lógica de conversão.
 * @param {object} source O objeto E3Map completo, já processado pelo adaptador.
 * @returns {object} O objeto OptimizedMap final, pronto para ser convertido para JSON.
 */
export function convertMap(E3Map) {
    // EXTRAINDO PARAMETRO SIZE DE E3Map
    const { size } = E3Map

    // EXTRAINDO PARAMETROS x E y DE size
    const [x, y] = size
    
    // CONVERTE O TAMANHO DO MAPA EM PIXELS PARA UNIDADES DE GRADE
    // EX.: 32 O TAMANHO DO SPRITE, X = 256 Pixels QUE RESULTA EM 256/32 = 8 TILES DE LARGURA
    const optimizedSize = [x/32, y/32];

    // Retorna o objeto final, construindo cada camada otimizada.
    return {
        size: optimizedSize,
        layers: {
            // Para paredes e pisos, usamos nosso orquestrador 'applyTileConversion'.
            walls: applyTileConversion(E3Map.walls, getBestWalls),
            floors: applyTileConversion(E3Map.floor, generateFloors),
            
            // Para todas as camadas de objeto, usamos a função mais simples 'convertObjectLayer'.
            // Passamos a camada de dados e a categoria correspondente.
            door_and_windows: convertObjectLayer(E3Map.door_and_windows, CategoryValues.DOOR_WINDOW),
            furniture: convertObjectLayer(E3Map.furniture, CategoryValues.FURNITURE),
            utensils: convertObjectLayer(E3Map.utensils, CategoryValues.UTENSILS),
            eletronics: convertObjectLayer(E3Map.eletronics, CategoryValues.ELECTRONICS),
            goals: convertObjectLayer(E3Map.interactive_elements, CategoryValues.GOALS),
            persons: convertObjectLayer(E3Map.persons, CategoryValues.PLAYER),
        }
    };
}