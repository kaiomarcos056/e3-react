import { spritesMap } from "../SpritesMap";

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
                
                const spriteDefinition = {
                    ...spriteTemplate,
                    name: spriteTemplate.name,
                    category: spriteTemplate.category,
                    translate: spriteTemplate.translate,
                    rotations: spriteTemplate.rotations,
                    path: rotationData.path,
                    anchor_code: rotationData.anchor_code,
                    _rotation: rotationKey,
                    _layout: rotationData.layout,
                };

                for (const row of rotationData.layout) {
                    for (const code of row) {
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


function normalizeTileCode(codigo) {
    if (codigo && codigo !== "-1" && !codigo.includes('.')) {
        return `${codigo}.0`;
    }
    return codigo;
}

export function converterXmlParaJson(xmlString) {
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

    const finalLayers = [];
    const processedTopLefts = new Set();

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

                const spriteDefinition = spriteLookupForLayer.get(codigo);

                if (spriteDefinition) {
                  
                    const partPositionInLayout = findCodeInLayout(spriteDefinition._layout, codigo);
                    if (!partPositionInLayout) continue; // Segurança

                    const topLeftX = x - partPositionInLayout.col;
                    const topLeftY = y - partPositionInLayout.row;
                    
                    const cellKey = `${layerName}-${topLeftY}-${topLeftX}`;
                    if (processedTopLefts.has(cellKey)) continue;

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

                    for (let r = 0; r < rows; r++) {
                        for (let c = 0; c < cols; c++) {
                            const childX = topLeftX + c;
                            const childY = topLeftY + r;
                            const childCodeOriginal = spriteDefinition._layout[r][c];
                            const childCode = normalizeTileCode(childCodeOriginal);
                            
                            newSprite.children.push({ x: childX, y: childY, codigo: childCode });
                            
                            processedTopLefts.add(`${layerName}-${childY}-${childX}`);
                        }
                    }
                    newSprites.push(newSprite);
                    
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
