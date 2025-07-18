import { TileValues } from "./types";


function generateWalls(tiles, vertical) {
    const walls = [];
    const height = tiles.length;

    if (height === 0) return [];
    const width = tiles[0].length;

    const outerLimit = vertical ? width : height;

    const innerLimit = vertical ? height : width;

    for (let i = 0; i < outerLimit; i++) {
       
        let wallStart = null;

        for (let j = 0; j < innerLimit; j++) {
          
            const x = vertical ? i : j;
            const y = vertical ? j : i;
            
            const isTile = tiles[y][x] === TileValues.TILE;

            if (isTile && !wallStart) {
                wallStart = [x, y];
            } 
            else if (!isTile && wallStart) {
                const start = wallStart;
               
                const end = [vertical ? x : j - 1, vertical ? j - 1 : y];
               
                walls.push({
                    start,
                    end,
                    type: null,
                    length: vertical ? (end[1] - start[1] + 1) : (end[0] - start[0] + 1)
                });
                wallStart = null;
            }
        }
    
        if (wallStart) {
            const start = wallStart;
           
            const end = [vertical ? i : innerLimit - 1, vertical ? innerLimit - 1 : i];
            
            walls.push({
                start,
                end,
                type: null,
                length: vertical ? (end[1] - start[1] + 1) : (end[0] - start[0] + 1)
            });
        }
    }

    return walls;
}

export function getBestWalls(originalTiles) {
    const tiles = originalTiles.map(row => [...row]);

    const horizontalWalls = generateWalls(tiles, false);

    const verticalWalls = generateWalls(tiles, true);

    const allWalls = [...horizontalWalls, ...verticalWalls];
  
    allWalls.sort((a, b) => b.length - a.length);

    const bestWalls = [];
 
    let remainingTiles = tiles.flat().filter(t => t === 1).length;
    
    for (const wall of allWalls) {
        if (remainingTiles === 0) break;

        const { start, end } = wall;

        let wallNeeded = false;
        
        if (start[1] === end[1]) {
            for (let x = start[0]; x <= end[0]; x++) {
                if (tiles[start[1]][x] === 1) {
                    wallNeeded = true;
                  
                    tiles[start[1]][x] = 0;

                    remainingTiles--;
                }
            }
        } 
      
        else if (start[0] === end[0]) {
          
            for (let y = start[1]; y <= end[1]; y++) {
            
                if (tiles[y][start[0]] === 1) {
                    wallNeeded = true;
                    tiles[y][start[0]] = 0;
                    remainingTiles--;
                }
            }
        }
   
        if (wallNeeded) {
            bestWalls.push({ start: wall.start, end: wall.end, type: wall.type });
        }
    }

    return bestWalls;
}
