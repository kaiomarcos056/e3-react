// Importa os valores para VAZIO e TILE (ex: 0 e 1).

import { TileValues } from "./types";

/**
 * Encontra todos os tiles que estão na borda de uma ou mais formas na grade.
 * Um tile de borda é um tile preenchido que tem pelo menos um vizinho vazio ou está no limite do mapa.
 * @param {Array<Array<number>>} grid A grade binária (0s e 1s) do material a ser analisado.
 * @returns {Array<Array<number>>} Um array com as coordenadas [x, y] de cada tile de borda.
 */
function findEdges(grid) {
    // Inicializa um array para armazenar as coordenadas das bordas encontradas.
    const edges = [];
    // Pega as dimensões da grade para controle dos limites.
    const height = grid.length;
    if (height === 0) return [];
    const width = grid[0].length;

    // Loop que varre cada linha da grade (eixo Y).
    for (let y = 0; y < height; y++) {
        // Loop que varre cada coluna da grade (eixo X).
        for (let x = 0; x < width; x++) {
            
            // Se a célula atual estiver vazia, pulamos para a próxima.
            if (grid[y][x] === TileValues.EMPTY) continue;

            // 'isEdge' é uma flag para sabermos se a célula atual é uma borda.
            let isEdge = false;

            // Loop aninhado para checar os 8 vizinhos ao redor da célula atual (y, x).
            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {

                    // Ignora a própria célula (deslocamento 0,0).
                    if (dx === 0 && dy === 0) continue;
                    
                    // Calcula a coordenada do vizinho.
                    const ny = y + dy;
                    const nx = x + dx;

                    // Se o vizinho está fora do mapa OU se o vizinho é uma célula vazia...
                    if (nx < 0 || nx >= width || ny < 0 || ny >= height || grid[ny][nx] === TileValues.EMPTY) {
                        // ...então a nossa célula atual (y,x) é uma borda.
                        isEdge = true;
                        // Podemos parar de checar os outros vizinhos desta célula.
                        break;
                    }
                }
                // Se já descobrimos que é uma borda, podemos parar o loop de vizinhos.
                if (isEdge) break;
            }
            // Se, após checar os vizinhos, a flag 'isEdge' for verdadeira, adicionamos as coordenadas à nossa lista.
            if (isEdge) edges.push([x, y]);
        }
    }
    // Retorna a lista de todas as bordas encontradas.
    return edges;
}

/**
 * Cria um "mapa de distância" para encontrar os pontos mais "centrais" de uma forma.
 * Ele funciona "descascando" a forma camada por camada, como uma cebola.
 * @param {Array<Array<number>>} grid A grade binária do material.
 * @returns {object} Um objeto onde a chave é a distância da borda (0, 1, 2...) e o valor é uma lista de pontos nessa distância.
 */
function pointDistanceMap(grid) {
    // Objeto para armazenar o resultado.
    const distanceMap = {};
    // Cria uma cópia da grade para podermos modificá-la sem afetar a original.
    const tempGrid = grid.map(row => [...row]);
    // A distância inicial da borda é 0.
    let distance = 0;

    // Loop infinito que só para quando não há mais bordas para "descascar".
    while (true) {
        // Encontra a camada de borda atual da nossa grade temporária.
        const edges = findEdges(tempGrid);
        // Se não encontrou nenhuma borda, significa que a forma acabou.
        if (edges.length === 0) break;
        // Armazena a lista de pontos da borda na distância atual.
        distanceMap[distance] = edges;
        // "Apaga" as bordas que acabamos de encontrar da grade temporária.
        for (const [x, y] of edges) tempGrid[y][x] = TileValues.EMPTY;
        // Incrementa a distância para a próxima camada da "cebola".
        distance++;
    }
    // Retorna o mapa de distância completo.
    return distanceMap;
}

/**
 * Função utilitária que verifica se uma determinada área retangular na grade contém apenas tiles preenchidos.
 * @returns {boolean} 'true' se a área for sólida, 'false' se contiver algum espaço vazio ou estiver fora dos limites.
 */
function checkDirection(x1, y1, x2, y2, grid) {
    const height = grid.length;
    const width = grid[0].length;
    // Checa se as coordenadas do retângulo estão dentro dos limites do mapa.
    if (x1 < 0 || x2 >= width || y1 < 0 || y2 >= height) return false;
    // Itera sobre a área do retângulo proposto.
    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
            // Se encontrar qualquer célula vazia, a área não é sólida.
            if (grid[y][x] === TileValues.EMPTY) return false;
        }
    }
    // Se o loop terminar sem encontrar células vazias, a área é sólida.
    return true;
}

// Funções "wrapper" para facilitar a chamada da 'checkDirection' para cada uma das 4 direções.
const checkUp = (floor, grid) => checkDirection(floor.start[0], floor.start[1] - 1, floor.end[0], floor.start[1] - 1, grid);
const checkRight = (floor, grid) => checkDirection(floor.end[0] + 1, floor.start[1], floor.end[0] + 1, floor.end[1], grid);
const checkDown = (floor, grid) => checkDirection(floor.start[0], floor.end[1] + 1, floor.end[0], floor.end[1] + 1, grid);
const checkLeft = (floor, grid) => checkDirection(floor.start[0] - 1, floor.start[1], floor.start[0] - 1, floor.end[1], grid);


/**
 * Encontra o maior retângulo contínuo possível dentro de uma forma, a partir de um ponto de partida ideal.
 * @param {Array<Array<number>>} grid A grade binária do material a ser otimizado.
 * @returns {object | null} O maior retângulo encontrado, ou 'null' se a grade estiver vazia.
 */
function generateBestFloor(grid) {
    // USA O ALGORITMO ANTIGO PARA ENCONTRAR UM PONTO DE PARTIDA.
    const distMap = pointDistanceMap(grid);
    const validDistances = Object.keys(distMap).map(Number);
    if (validDistances.length === 0) return null;
    
    const maxDistance = Math.max(...validDistances);
    const startPoint = distMap[maxDistance][0];
    if (!startPoint) return null;
    
    // Inicializa um retângulo de 1x1 nesse ponto de partida.
    const floor = { start: [...startPoint], end: [...startPoint], type: null };

    // --- ALGORITMO DE EXPANSÃO CORRIGIDO ---
    // Flags de controle para cada uma das quatro direções.
    let canGrowUp = true;
    let canGrowDown = true;
    let canGrowLeft = true;
    let canGrowRight = true;

    // Loop que continua enquanto for possível expandir em PELO MENOS UMA direção.
    while (canGrowUp || canGrowDown || canGrowLeft || canGrowRight) {
        // Bloco para a direção 'Cima'.
        if (canGrowUp) {
            // Se a linha acima do retângulo atual for sólida...
            if (checkUp(floor, grid)) {
                // ...expande o retângulo para cima (diminuindo a coordenada Y inicial).
                floor.start[1]--;
            } else {
                // Senão, desiste de tentar crescer para cima para sempre.
                canGrowUp = false;
            }
        }
        // Repete a mesma lógica para a direção 'Baixo'.
        if (canGrowDown) {
            if (checkDown(floor, grid)) {
                floor.end[1]++;
            } else {
                canGrowDown = false;
            }
        }
        // Repete a mesma lógica para a direção 'Direita'.
        if (canGrowRight) {
            if (checkRight(floor, grid)) {
                floor.end[0]++;
            } else {
                canGrowRight = false;
            }
        }
        // Repete a mesma lógica para a direção 'Esquerda'.
        if (canGrowLeft) {
            if (checkLeft(floor, grid)) {
                floor.start[0]--;
            } else {
                canGrowLeft = false;
            }
        }
    }

    // Retorna o retângulo final, após ele ter crescido o máximo possível.
    return floor;
}


/**
 * Função principal que orquestra a otimização da camada de piso.
 * Ela encontra e remove o maior retângulo possível repetidamente até cobrir toda a área.
 * @param {Array<Array<number>>} originalTiles A grade binária de um material de piso.
 * @returns {Array<object>} Uma lista de retângulos otimizados que cobrem a grade original.
 */
export function generateFloors(originalTiles) {
    // Lista para guardar os retângulos otimizados finais.
    const floors = [];
    // Cria uma cópia da grade para podermos "apagar" os tiles sem modificar a original.
    const grid = originalTiles.map(row => [...row]);
    // Calcula o número total de tiles a serem cobertos, garantindo que a soma seja numérica.
    let remainingTiles = grid.flat().reduce((sum, tile) => sum + Number(tile), 0);

    // O loop principal: continua enquanto houver tiles a serem cobertos.
    while (remainingTiles > 0) {
        // A cada iteração, chama nossa função para encontrar o maior retângulo possível na grade ATUAL.
        const bestFloor = generateBestFloor(grid);
        // Segurança: se nenhum retângulo for encontrado, para o loop para evitar um loop infinito.
        if (!bestFloor) break;
        // Adiciona o retângulo encontrado à nossa lista de resultados.
        floors.push(bestFloor);

        // Este bloco "apaga" o retângulo recém-encontrado da nossa grade de trabalho.
        for (let y = bestFloor.start[1]; y <= bestFloor.end[1]; y++) {
            for (let x = bestFloor.start[0]; x <= bestFloor.end[0]; x++) {
                // Verifica se a célula realmente continha um tile antes de decrementar.
                if (Number(grid[y][x]) === 1) {
                    // Define o valor da célula para 0 (vazio).
                    grid[y][x] = 0;
                    // Decrementa o contador de tiles restantes.
                    remainingTiles--;
                }
            }
        }
    }
    // Quando o loop termina (todos os tiles foram cobertos), retorna a lista completa de retângulos.
    return floors;
}
