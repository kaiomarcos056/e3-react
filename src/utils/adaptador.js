export function adaptarAppJsonParaE3Map(appJson) {

    const { width, height, tileSize, layers } = appJson;
    const VOID_ID = "-1";

    const tamanhoEmPixels = [width * tileSize, height * tileSize];

    const layerNameMapping = {
        floor: 'floor',
        walls: 'walls',
        door_and_windows: 'door_and_windows',
        furniture: 'furniture',
        eletronics: 'eletronics',
        utensils: 'utensils',
        interactive_elements: 'interactive_elements',
        persons: 'persons'
    };

    const grids = {};
    
    for (const key in layerNameMapping) {
        const e3mapLayerName = layerNameMapping[key];
        grids[e3mapLayerName] = Array(height).fill(0).map(() => Array(width).fill(VOID_ID));
    }

    for (const layer of layers) {
        
        const targetGridName = layerNameMapping[layer.id];
        if (!targetGridName) continue;
        
        const targetGrid = grids[targetGridName];

        for (const sprite of layer.sprites) {

            if (sprite.children && sprite.children.length > 0) {
                for (const child of sprite.children) {
                    const { x, y, codigo } = child;

                    if (y < height && x < width) {
                        targetGrid[y][x] = String(codigo);
                    }
                }
            }
        }
    }

    return {
        size: tamanhoEmPixels,
        floor: grids.floor,
        walls: grids.walls,
        door_and_windows: grids.door_and_windows,
        furniture: grids.furniture,
        utensils: grids.utensils,
        eletronics: grids.eletronics,
        interactive_elements: grids.interactive_elements,
        persons: grids.persons
    };
}
