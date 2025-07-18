import { CategoryValues, TileValues } from "./types";

import { getPropsByCategory, VOID_ID } from "./tileService";
import { generateFloors } from "./floor";
import { getBestWalls } from "./walls";

export function splitMaterials(layer) {

    const materials = {};

    const height = layer.length;
    if (height === 0) return {};

    const width = layer[0].length;

    for (let y = 0; y < height; y++) {

        for (let x = 0; x < width; x++) {
    
            const tileId = String(layer[y][x]);

            if (tileId !== VOID_ID) {

                if (!materials[tileId]) {
                    materials[tileId] = Array(height).fill(0).map(() => Array(width).fill(TileValues.EMPTY));
                }
                
                materials[tileId][y][x] = TileValues.TILE;
            }
        }

    }

    return materials;
}


function convertObjectLayer(layer, category) {

    const objects = [];

    const propsByCategory = getPropsByCategory();

    const categoryProps = propsByCategory[category];

    if (!categoryProps) return [];

    const mainIds = new Set(categoryProps.map(prop => prop.code));

    const height = layer.length;
    if (height === 0) return [];
    const width = layer[0].length;

    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const id = String(layer[y][x]);

            if (mainIds.has(id)) {
                objects.push({ type: id, pos: [x, y] });
            }
        }
    }
    
    return objects;
}

function applyTileConversion(layer, optimizationFunc) {

    const materialGrids = splitMaterials(layer);

    const allTiles = [];

    for (const materialId in materialGrids) {

        const grid = materialGrids[materialId];

        const optimizedTiles = optimizationFunc(grid);

        for (const tile of optimizedTiles) {
            tile.type = materialId;

            allTiles.push(tile);
        }

    }

    return allTiles;
}

export function convertMap(E3Map) {
    const { size } = E3Map

    const [x, y] = size
    
    const optimizedSize = [x/32, y/32];

    return {
        size: optimizedSize,
        layers: {
            walls: applyTileConversion(E3Map.walls, getBestWalls),
            floors: applyTileConversion(E3Map.floor, generateFloors),
            door_and_windows: convertObjectLayer(E3Map.door_and_windows, CategoryValues.DOOR_WINDOW),
            furniture: convertObjectLayer(E3Map.furniture, CategoryValues.FURNITURE),
            utensils: convertObjectLayer(E3Map.utensils, CategoryValues.UTENSILS),
            eletronics: convertObjectLayer(E3Map.eletronics, CategoryValues.ELECTRONICS),
            goals: convertObjectLayer(E3Map.interactive_elements, CategoryValues.GOALS),
            persons: convertObjectLayer(E3Map.persons, CategoryValues.PLAYER),
        }
    };
}