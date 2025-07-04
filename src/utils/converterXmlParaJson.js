// import { spritesMap } from "../SpritesMap";

import { spritesMap } from "../SpritesMap";

// /**
//  * Função auxiliar para criar um mapa de busca aninhado a partir do seu spritesMap.
//  * @param {Array} spritesMap - A sua estrutura de dados principal com a definição de todos os sprites.
//  * @returns {Map<string, Map<string, object>>} Um mapa onde a chave externa é a categoria (ex: 'floor')
//  * e o valor é outro mapa, onde a chave é o 'anchor_code' e o valor é o objeto de sprite.
//  */
// function criarMapaDeBuscaDeSprites(spritesMap) {
//     console.log("--- [criarMapaDeBuscaDeSprites] Iniciada ---");
//     const lookupByLayer = new Map();

//     for (const category of spritesMap) {
//         const layerId = category.category;
//         console.log(`\nProcessando categoria: ${layerId}`);

//         if (!lookupByLayer.has(layerId)) {
//             lookupByLayer.set(layerId, new Map());
//         }
//         const innerMap = lookupByLayer.get(layerId);

//         for (const spriteTemplate of category.sprites) {
//             console.log(`  Lendo template do sprite: "${spriteTemplate.name}"`);
            
//             for (const rotationKey in spriteTemplate.rotations) {
//                 const rotationData = spriteTemplate.rotations[rotationKey];
                
//                 // Usamos a versão anterior da lógica que era mais simples.
//                 if (!innerMap.has(rotationData.anchor_code)) {
                    
//                     const spriteDefinition = {
//                         ...spriteTemplate, // Copia as propriedades base

//                         name: spriteTemplate.name,
//                         size: spriteTemplate.size,
//                         category: spriteTemplate.category,
//                         translate: spriteTemplate.translate,
//                         rotations: spriteTemplate.rotations, 
//                         path: rotationData.path,
//                         anchor_code: rotationData.anchor_code,
//                         _rotation: rotationKey,
//                         _layout: rotationData.layout,
//                     };

//                     console.log(`    - Rotação ${rotationKey}:`);
//                     console.log(`      Anchor Code: ${rotationData.anchor_code}`);
//                     console.log(`      Path Definido: ${rotationData.path}`);
//                     console.log(`      Objeto final a ser guardado:`, spriteDefinition);

//                     innerMap.set(rotationData.anchor_code, spriteDefinition);
//                 }
//             }
//         }
//     }
//     console.log("--- [criarMapaDeBuscaDeSprites] Finalizada ---");
//     return lookupByLayer;
// }

// /**
//  * Normaliza um código de tile para garantir que ele tenha o formato "X.X".
//  * Ex: "3" se torna "3.0", mas "3.1" e "-1" permanecem inalterados.
//  * @param {string} codigo - O código do tile a ser normalizado.
//  * @returns {string} O código normalizado.
//  */
// function normalizeTileCode(codigo) {
//     // Se o código não for o de "vazio" e não contiver um ponto...
//     if (codigo && codigo !== "-1" && !codigo.includes('.')) {
//         // ...adiciona ".0" ao final.
//         return `${codigo}.0`;
//     }
//     // Caso contrário, retorna o código original.
//     return codigo;
// }

// /**
//  * Converte uma string XML no formato legado de volta para o formato de mapa JSON do seu editor.
//  *
//  * @param {string} xmlString - A string contendo o conteúdo do arquivo XML.
//  * @param {Array} spritesMap - A sua estrutura de dados `spritesMap` para referenciar os sprites.
//  * @returns {object} O objeto JSON completo no formato do seu editor.
//  */
// export function converterXmlParaJson(xmlString) {
//     // 1. PARSE DO XML E PREPARAÇÃO DOS DADOS
//     const parser = new DOMParser();
//     const xmlDoc = parser.parseFromString(xmlString, "application/xml");

//     const canvas = xmlDoc.querySelector("canvas");
//     const widthInPixels = parseInt(canvas.getAttribute("width") || '0', 10);
//     const heightInPixels = parseInt(canvas.getAttribute("height") || '0', 10);
//     const tileSize = parseInt(xmlDoc.querySelector("tileset")?.getAttribute("tilewidth") || '32', 10);

//     const width = widthInPixels / tileSize;
//     const height = heightInPixels / tileSize;

//     // Cria o mapa de busca aninhado.
//     const spriteLookup = criarMapaDeBuscaDeSprites(spritesMap);
//     console.log(spriteLookup)

//     // 2. RECONSTRUÇÃO DAS GRADES A PARTIR DO XML (lógica inalterada)
//     const grids = {};
//     const xmlLayers = xmlDoc.querySelectorAll("layer");
//     xmlLayers.forEach(layer => {
//         const layerName = layer.getAttribute("name");
//         const tiles1D = layer.textContent.replace(/\s/g, '').split(',');
//         const grid = [];
//         for (let i = 0; i < height; i++) {
//             grid.push(tiles1D.slice(i * width, (i + 1) * width));
//         }
//         grids[layerName] = grid;
//     });

//     // 3. RECONSTRUÇÃO DOS SPRITES A PARTIR DAS GRADES (lógica corrigida)
//     const finalLayers = [];
//     const processedCells = new Set(); 

//     const idMapping = {
//         floor: 'floor', walls: 'wall', door_and_windows: 'door',
//         furniture: 'furniture', eletronics: 'appliances', utensils: 'utensils',
//         interactive_elements: 'interactive', persons: 'person'
//     };

//     for (const layerName in grids) {
//         const grid = grids[layerName];
//         const newSprites = [];
        
//         // --- LÓGICA DE BUSCA CORRIGIDA ---
//         // a. Pega o ID da categoria correspondente ao nome da camada XML (ex: 'walls' -> 'wall').
//         const layerId = idMapping[layerName];

//         // b. Pega o mapa de busca específico para esta camada.
//         const spriteLookupForLayer = spriteLookup.get(layerId);

//         // c. Se não houver sprites definidos para esta camada, pula para a próxima.
//         if (!spriteLookupForLayer) continue;
//         // --- FIM DA CORREÇÃO ---

//         for (let y = 0; y < height; y++) {
//             for (let x = 0; x < width; x++) {
//                 const cellKey = `${layerName}-${y}-${x}`; // Adiciona layerName para evitar colisões entre camadas
//                 if (processedCells.has(cellKey)) continue;

//                 // Pega o código da célula e o normaliza.
//                 const codigoOriginal = grid[y][x];
//                 const codigo = normalizeTileCode(codigoOriginal);
//                 if (codigo === "-1") continue;

//                 // d. Usa o mapa de busca específico da camada para encontrar a definição do sprite.
//                 const spriteDefinition = spriteLookupForLayer.get(codigo);

//                 if (spriteDefinition) {
//                     // ENCONTRAMOS UM SPRITE!
//                     const [cols, rows] = spriteDefinition.size;
                    
//                     // O canto superior esquerdo do objeto é a posição onde a âncora foi encontrada,
//                     // menos o deslocamento da âncora. (Esta parte precisa ser implementada se você usar âncoras não-padrão)
//                     // Por simplicidade aqui, vamos assumir que a âncora é o canto superior esquerdo.
//                     // Para uma solução completa, você precisaria da "Planta Baixa" que discutimos.
//                     const topLeftX = x;
//                     const topLeftY = y;

//                     const newSprite = {
//                         ...spriteDefinition,
//                         x: topLeftX,
//                         y: topLeftY,
//                         rotation: parseInt(spriteDefinition._rotation, 10),
//                         children: []
//                     };

//                     for (let r = 0; r < rows; r++) {
//                         for (let c = 0; c < cols; c++) {
//                             const childX = topLeftX + c;
//                             const childY = topLeftY + r;
//                             const childCode = spriteDefinition._layout[r][c];
                            
//                             newSprite.children.push({ x: childX, y: childY, codigo: childCode });
//                             processedCells.add(`${layerName}-${childY}-${childX}`);
//                         }
//                     }
//                     newSprites.push(newSprite);
//                 }
//             }
//         }
        
//         finalLayers.push({
//             id: layerId || layerName,
//             name: layerName.charAt(0).toUpperCase() + layerName.slice(1),
//             visible: true,
//             sprites: newSprites
//         });
//     }

//     // 4. MONTA O OBJETO JSON FINAL
//     return {
//         width, height, tileSize,
//         spriteSheetPath: "",
//         layers: finalLayers
//     };
// }



/**
 * Função auxiliar para encontrar a posição relativa de um código dentro de um layout 2D.
 * @param {Array<Array<string>>} layout - A matriz de layout do sprite (ex: [['0.0'], ['1.0']]).
 * @param {string} codeToFind - O código a ser encontrado.
 * @returns {{row: number, col: number} | null} A posição relativa ou null se não for encontrado.
 */
function findCodeInLayout(layout, codeToFind) {
    for (let r = 0; r < layout.length; r++) {
        for (let c = 0; c < layout[r].length; c++) {
            if (layout[r][c] === codeToFind) {
                return { row: r, col: c };
            }
        }
    }
    return null;
}

/**
 * Função auxiliar para criar um mapa de busca aninhado e mais poderoso.
 * Agora, ela mapeia CADA CÓDIGO de um objeto para a sua definição "pai".
 * @param {Array} spritesMap - A sua estrutura de dados principal com a definição de todos os sprites.
 * @returns {Map<string, Map<string, object>>} Um mapa onde a chave externa é a categoria
 * e o valor é outro mapa, onde a chave é QUALQUER código de tile e o valor é a definição do sprite.
 */
function criarMapaDeBuscaDeSprites(spritesMap) {
    const lookupByLayer = new Map();

    for (const category of spritesMap) {
        const layerId = category.category;
        if (!lookupByLayer.has(layerId)) {
            lookupByLayer.set(layerId, new Map());
        }
        const innerMap = lookupByLayer.get(layerId);

        for (const spriteTemplate of category.sprites) {
            for (const rotationKey in spriteTemplate.rotations) {
                const rotationData = spriteTemplate.rotations[rotationKey];
                
                // CRIA A DEFINIÇÃO COMPLETA DO SPRITE PARA ESTA ROTAÇÃO
                const spriteDefinition = {
                    ...spriteTemplate,
                    name: spriteTemplate.name,
                    //size: spriteTemplate.size,
                    category: spriteTemplate.category,
                    translate: spriteTemplate.translate,
                    rotations: spriteTemplate.rotations,
                    path: rotationData.path,
                    anchor_code: rotationData.anchor_code,
                    _rotation: rotationKey,
                    _layout: rotationData.layout,
                };

                // Itera sobre CADA TILE no layout desta rotação.
                for (const row of rotationData.layout) {
                    for (const code of row) {
                        // Mapeia cada código individual para a definição completa do sprite.
                        if (!innerMap.has(code)) {
                            innerMap.set(code, spriteDefinition);
                        }
                    }
                }
            }
        }
    }
    return lookupByLayer;
}


/**
 * Normaliza um código de tile para garantir que ele tenha o formato "X.X".
 * @param {string} codigo - O código do tile a ser normalizado.
 * @returns {string} O código normalizado.
 */
function normalizeTileCode(codigo) {
    if (codigo && codigo !== "-1" && !codigo.includes('.')) {
        return `${codigo}.0`;
    }
    return codigo;
}

/**
 * Converte uma string XML no formato legado de volta para o formato de mapa JSON do seu editor.
 *
 * @param {string} xmlString - A string contendo o conteúdo do arquivo XML.
 * @param {Array} spritesMap - A sua estrutura de dados `spritesMap` para referenciar os sprites.
 * @returns {object} O objeto JSON completo no formato do seu editor.
 */
export function converterXmlParaJson(xmlString) {
    // ... (Parse do XML e reconstrução das grades permanecem os mesmos)
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, "application/xml");
    const canvas = xmlDoc.querySelector("canvas");
    const widthInPixels = parseInt(canvas.getAttribute("width") || '0', 10);
    const heightInPixels = parseInt(canvas.getAttribute("height") || '0', 10);
    const tileSize = parseInt(xmlDoc.querySelector("tileset")?.getAttribute("tilewidth") || '32', 10);
    const width = widthInPixels / tileSize;
    const height = heightInPixels / tileSize;
    const spriteLookup = criarMapaDeBuscaDeSprites(spritesMap);
    const grids = {};
    const xmlLayers = xmlDoc.querySelectorAll("layer");
    xmlLayers.forEach(layer => {
        const layerName = layer.getAttribute("name");
        const tiles1D = layer.textContent.replace(/\s/g, '').split(',');
        const grid = [];
        for (let i = 0; i < height; i++) {
            grid.push(tiles1D.slice(i * width, (i + 1) * width));
        }
        grids[layerName] = grid;
    });

    // --- RECONSTRUÇÃO DOS SPRITES COM A LÓGICA CORRIGIDA ---
    const finalLayers = [];
    const processedTopLefts = new Set(); // Guarda os cantos superiores esquerdos já processados (ex: "layer-y-x")

    const idMapping = {
        floor: 'floor', 
        walls: 'walls', 
        door_and_windows: 'door_and_windows',
        furniture: 'furniture', 
        eletronics: 'eletronics', 
        utensils: 'utensils',
        interactive_elements: 'interactive_elements', 
        persons: 'persons'
    };

    for (const layerName in grids) {
        const grid = grids[layerName];
        const newSprites = [];
        const layerId = idMapping[layerName];
        const spriteLookupForLayer = spriteLookup.get(layerId);
        if (!spriteLookupForLayer) continue;

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const codigoOriginal = grid[y][x];
                const codigo = normalizeTileCode(codigoOriginal);

                if (codigo === "-1") continue;

                // Procura a definição do sprite a partir do código da célula atual.
                const spriteDefinition = spriteLookupForLayer.get(codigo);

                if (spriteDefinition) {
                    // ENCONTRAMOS UMA PARTE DE UM OBJETO!
                    
                    // a. Descobre a posição relativa desta parte dentro do seu próprio layout.
                    const partPositionInLayout = findCodeInLayout(spriteDefinition._layout, codigo);
                    if (!partPositionInLayout) continue; // Segurança

                    // b. Calcula a posição do VERDADEIRO canto superior esquerdo do objeto.
                    const topLeftX = x - partPositionInLayout.col;
                    const topLeftY = y - partPositionInLayout.row;
                    
                    // c. Verifica se já processámos o objeto que começa nesta posição.
                    const cellKey = `${layerName}-${topLeftY}-${topLeftX}`;
                    if (processedTopLefts.has(cellKey)) continue;

                    // Se não processámos, este é um novo objeto a ser criado.
                    // --- AJUSTE NA LÓGICA DO SIZE ---
                    // Calcula o tamanho dinamicamente a partir do layout da rotação atual.
                    const rows = spriteDefinition._layout.length;
                    const cols = spriteDefinition._layout[0] ? spriteDefinition._layout[0].length : 0;
                    const newSize = [cols, rows];

                    const newSprite = {
                        ...spriteDefinition,
                        size: newSize,
                        x: topLeftX,
                        y: topLeftY,
                        rotation: parseInt(spriteDefinition._rotation, 10),
                        children: []
                    };
                    
                    delete newSprite._rotation;
                    delete newSprite._layout;

                    // d. Preenche os children e marca TODAS as células do objeto como processadas.
                    for (let r = 0; r < rows; r++) {
                        for (let c = 0; c < cols; c++) {
                            const childX = topLeftX + c;
                            const childY = topLeftY + r;
                            const childCodeOriginal = spriteDefinition._layout[r][c];
                            const childCode = normalizeTileCode(childCodeOriginal);
                            
                            newSprite.children.push({ x: childX, y: childY, codigo: childCode });
                            // Marca a célula como parte de um objeto já criado.
                            processedTopLefts.add(`${layerName}-${childY}-${childX}`);
                        }
                    }
                    newSprites.push(newSprite);
                    // Adiciona o canto superior esquerdo ao set para garantir que não o recriamos.
                    processedTopLefts.add(cellKey);
                }
            }
        }
        
        finalLayers.push({
            id: layerId || layerName,
            name: layerName.charAt(0).toUpperCase() + layerName.slice(1),
            visible: true,
            sprites: newSprites
        });
    }

    return {
        width, height, tileSize,
        spriteSheetPath: "",
        layers: finalLayers
    };
}
