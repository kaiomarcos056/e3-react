// Importa os valores para VAZIO e TILE (0 e 1).
import { TileValues } from "./types";


/**
 * Esta função faz o "censo" de todas as linhas retas possíveis em uma grade.
 * Ela pode procurar por linhas horizontais OU verticais, dependendo do parâmetro 'vertical'.
 * @param {Array<Array<number>>} tiles A grade binária (0s e 1s) de um material específico.
 * @param {boolean} vertical Se for 'true', procura por paredes verticais. Se 'false', horizontais.
 * @returns {Array<object>} Uma lista de todas as paredes candidatas encontradas.
 */
function generateWalls(tiles, vertical) {
    // Inicializa um array vazio para guardar as paredes que encontrarmos.
    const walls = [];
    // Pega a altura e largura da grade para usar nos limites dos loops.
    const height = tiles.length;
    // Se a grade estiver vazia, retorna a lista vazia imediatamente.
    if (height === 0) return [];
    const width = tiles[0].length;

    // TRUQUE DE LÓGICA: Para evitar escrever duas funções (uma para horizontal e outra para vertical),
    // nós trocamos os limites dos loops.
    // Se for vertical, o loop externo vai de 0 à largura (colunas).
    // Se for horizontal, o loop externo vai de 0 à altura (linhas).
    const outerLimit = vertical ? width : height;
    // O loop interno faz o oposto.
    const innerLimit = vertical ? height : width;

    // Loop externo: itera por cada coluna (se vertical) ou cada linha (se horizontal).
    for (let i = 0; i < outerLimit; i++) {
        // 'wallStart' guarda a coordenada de início da parede que estamos construindo atualmente.
        // É 'null' se não estivermos no meio de uma parede.
        let wallStart = null;

        // Loop interno: itera por cada célula dentro da linha/coluna atual.
        for (let j = 0; j < innerLimit; j++) {
            // TRUQUE DE LÓGICA: Calcula as coordenadas (x, y) reais com base no modo (vertical/horizontal).
            const x = vertical ? i : j;
            const y = vertical ? j : i;
            
            // Verifica se a célula atual contém um tile de parede (valor 1).
            const isTile = tiles[y][x] === TileValues.TILE;

            // CASO 1: Encontramos um tile E não estávamos construindo uma parede.
            // Isso significa que uma nova parede começa aqui.
            if (isTile && !wallStart) {
                // Guardamos a posição de início.
                wallStart = [x, y];
            // CASO 2: Encontramos um espaço vazio E estávamos construindo uma parede.
            // Isso significa que a parede que vínhamos construindo acaba de terminar.
            } else if (!isTile && wallStart) {
                // Pega a posição de início que guardamos.
                const start = wallStart;
                // A posição final é a célula anterior (j - 1).
                const end = [vertical ? x : j - 1, vertical ? j - 1 : y];
                // Adiciona a parede recém-terminada à nossa lista de resultados.
                walls.push({
                    start,
                    end,
                    type: null, // O tipo do material será adicionado depois.
                    // Calcula o comprimento da parede.
                    length: vertical ? (end[1] - start[1] + 1) : (end[0] - start[0] + 1)
                });
                // Reseta 'wallStart' para 'null', pois não estamos mais no meio de uma parede.
                wallStart = null;
            }
        }
        // CASO DE BORDA: O loop interno acabou, mas uma parede ainda estava "aberta"
        // (ex: uma linha que vai até a borda direita/inferior da grade).
        if (wallStart) {
            // Pega a posição de início guardada.
            const start = wallStart;
            // A posição final é a última célula do loop interno.
            const end = [vertical ? i : innerLimit - 1, vertical ? innerLimit - 1 : i];
            // Adiciona esta parede final à lista.
             walls.push({
                start,
                end,
                type: null,
                length: vertical ? (end[1] - start[1] + 1) : (end[0] - start[0] + 1)
            });
        }
    }
    // Retorna a lista completa de todas as linhas retas encontradas.
    return walls;
}


/**
 * Função principal que implementa o algoritmo "guloso" para encontrar o melhor conjunto de paredes.
 * @param {Array<Array<number>>} originalTiles A grade binária do material de parede a ser otimizado.
 * @returns {Array<object>} Uma lista otimizada de paredes que cobrem toda a área.
 */
export function getBestWalls(originalTiles) {
    // Cria uma cópia da grade de tiles. Isso é MUITO importante para não modificar
    // a grade original, pois vamos "apagar" tiles desta cópia.
    const tiles = originalTiles.map(row => [...row]);
    // Chama a função 'generateWalls' para fazer o censo de todas as linhas horizontais.
    const horizontalWalls = generateWalls(tiles, false);
    // Chama a função 'generateWalls' novamente para fazer o censo de todas as linhas verticais.
    const verticalWalls = generateWalls(tiles, true);

    // Junta as duas listas em uma única lista gigante com todas as paredes candidatas.
    const allWalls = [...horizontalWalls, ...verticalWalls];
    // ESTE É O PASSO MAIS IMPORTANTE DA ESTRATÉGIA:
    // Ordena a lista de candidatas da mais comprida para a mais curta.
    allWalls.sort((a, b) => b.length - a.length);

    // Inicializa a lista que guardará o resultado final.
    const bestWalls = [];
    // Conta quantos tiles de parede precisam ser cobertos no total.
    let remainingTiles = tiles.flat().filter(t => t === 1).length;
    
    // Itera sobre a lista de candidatas, começando sempre pela mais longa disponível.
    for (const wall of allWalls) {
        // Se já cobrimos todos os tiles, podemos parar o loop mais cedo. É uma otimização.
        if (remainingTiles === 0) break;

        // Pega as coordenadas de início e fim da parede candidata atual.
        const { start, end } = wall;
        // 'wallNeeded' é uma flag para sabermos se esta parede foi útil ou não.
        let wallNeeded = false;
        
        // Verifica se é uma parede horizontal (coordenada Y é a mesma).
        if (start[1] === end[1]) {
            // Itera sobre cada tile que compõe esta parede horizontal.
            for (let x = start[0]; x <= end[0]; x++) {
                // Pergunta: "Este tile na grade de trabalho já foi coberto?"
                if (tiles[start[1]][x] === 1) { // 1 significa que ainda não foi coberto.
                    // Se não foi, esta parede é necessária!
                    wallNeeded = true;
                    // "Apaga" o tile da nossa grade de trabalho, marcando-o como coberto (0).
                    tiles[start[1]][x] = 0;
                    // Decrementa o contador de tiles restantes.
                    remainingTiles--;
                }
            }
        } 
        // Se não for horizontal, verifica se é uma parede vertical.
        else if (start[0] === end[0]) {
            // Itera sobre cada tile que compõe esta parede vertical.
            for (let y = start[1]; y <= end[1]; y++) {
                // Faz a mesma verificação: este tile ainda precisa ser coberto?
                if (tiles[y][start[0]] === 1) {
                    wallNeeded = true;
                    tiles[y][start[0]] = 0;
                    remainingTiles--;
                }
            }
        }

        // Após checar todos os tiles da parede candidata, verificamos a nossa flag.
        if (wallNeeded) {
            // Se a parede foi útil (cobriu pelo menos um tile novo), nós a adicionamos
            // à nossa lista de resultados finais.
            bestWalls.push({ start: wall.start, end: wall.end, type: wall.type });
        }
    }
    // Retorna a lista com as paredes otimizadas.
    return bestWalls;
}
