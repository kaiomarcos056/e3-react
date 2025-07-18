import { TileValues } from "./types";

function findEdges(grid) {

    const edges = [];

    const height = grid.length;
    if (height === 0) return [];
    const width = grid[0].length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            
            if (grid[y][x] === TileValues.EMPTY) continue;

            let isEdge = false;

            for (let dy = -1; dy <= 1; dy++) {
                for (let dx = -1; dx <= 1; dx++) {

                    if (dx === 0 && dy === 0) continue;
                    
                    const ny = y + dy;
                    const nx = x + dx;

                    if (nx < 0 || nx >= width || ny < 0 || ny >= height || grid[ny][nx] === TileValues.EMPTY) {
                        isEdge = true;
                        break;
                    }
                }
                
                if (isEdge) break;
            }
            
            if (isEdge) edges.push([x, y]);
        }
    }
    
    return edges;
}

function pointDistanceMap(grid) {
    
    const distanceMap = {};
    
    const tempGrid = grid.map(row => [...row]);
    
    let distance = 0;

    while (true) {
        const edges = findEdges(tempGrid);
        
        if (edges.length === 0) break;
        
        distanceMap[distance] = edges;
        
        for (const [x, y] of edges) tempGrid[y][x] = TileValues.EMPTY;
        
        distance++;
    }
    
    return distanceMap;
}

function checkDirection(x1, y1, x2, y2, grid) {
    const height = grid.length;
    const width = grid[0].length;
    
    if (x1 < 0 || x2 >= width || y1 < 0 || y2 >= height) return false;
    
    for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
            
            if (grid[y][x] === TileValues.EMPTY) return false;
        }
    }
    
    return true;
}

const checkUp = (floor, grid) => checkDirection(floor.start[0], floor.start[1] - 1, floor.end[0], floor.start[1] - 1, grid);
const checkRight = (floor, grid) => checkDirection(floor.end[0] + 1, floor.start[1], floor.end[0] + 1, floor.end[1], grid);
const checkDown = (floor, grid) => checkDirection(floor.start[0], floor.end[1] + 1, floor.end[0], floor.end[1] + 1, grid);
const checkLeft = (floor, grid) => checkDirection(floor.start[0] - 1, floor.start[1], floor.start[0] - 1, floor.end[1], grid);

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

export function generateFloors(originalTiles) {
    
    const floors = [];
    
    const grid = originalTiles.map(row => [...row]);
    
    let remainingTiles = grid.flat().reduce((sum, tile) => sum + Number(tile), 0);

    while (remainingTiles > 0) {
        
        const bestFloor = generateBestFloor(grid);
        
        if (!bestFloor) break;
        
        floors.push(bestFloor);

        for (let y = bestFloor.start[1]; y <= bestFloor.end[1]; y++) {
            for (let x = bestFloor.start[0]; x <= bestFloor.end[0]; x++) {
                
                if (Number(grid[y][x]) === 1) {
                    grid[y][x] = 0;

                    remainingTiles--;
                }
            }
        }
    }
    
    return floors;
}
