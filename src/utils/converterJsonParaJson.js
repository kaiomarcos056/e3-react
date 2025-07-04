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
        
        // Verifica se o Map principal 'lookupByLayer' NÃO possui a chave 'layerId'
        if (!lookupByLayer.has(layerId)) {
            // Se não possuir, cria uma nova entrada no Map principal:
            // - a chave é 'layerId'
            // - o valor é um novo Map vazio, para armazenar dados relacionados a esse layer
            lookupByLayer.set(layerId, new Map());
        }

        // Recupera o Map interno associado à chave 'layerId' dentro do Map principal 'lookupByLayer'
        // Esse Map interno armazena os dados específicos daquele layer
        const innerMap = lookupByLayer.get(layerId);

        // Percorrendo todos os sprites de todas as camdas
        for (const spriteTemplate of category.sprites) {
                
            for (const rotationKey in spriteTemplate.rotations) {
                
                const rotationData = spriteTemplate.rotations[rotationKey];

                // CRIA A DEFINIÇÃO COMPLETA DO SPRITE PARA ESTA ROTAÇÃO
                const spriteDefinition = {
                    ...spriteTemplate,
                    path: rotationData.path,
                    anchor_code: rotationData.anchor_code,
                    rotation: rotationKey,
                    layout: rotationData.layout,
                };

                for (const row of rotationData.layout) {
                    for (const code of row) {
                        if (!innerMap.has(code)) innerMap.set(code, spriteDefinition);
                    }
                }
            }
        }
    }
    return lookupByLayer;
}

export function converterJsonParaJson(json) {
    
    // CRIANDO MAPEAMENTO DO spriteMap.js POR PONTO ANCORA
    const pesquisaDeSprite = criarMapaDeBuscaDeSprites(spritesMap);

    const { size } = json;
    const [width, height] = size;

    const tilemap = {
        width,
        height,
        tileSize: 32,
        spriteSheetPath: "",
        layers: [
            { id: "floor", name: "Pisos", visible: true, sprites: [] },
            { id: "walls", name: "Paredes", visible: true, sprites: [] },
            { id: "door_and_windows", name: "Portas e Janelas", visible: true, sprites: [] },
            { id: "furniture", name: "Móveis", visible: true, sprites: [] },
            { id: "utensils", name: "Utensílios", visible: true, sprites: [] },
            { id: "eletronics", name: "Eletrodomésticos", visible: true, sprites: [] },
            { id: "interactive_elements", name: "Elementos Interativos", visible: true, sprites: [] },
            { id: "persons", name: "Pessoa", visible: true, sprites: [] }
        ]
    }

    const layersJSON = new Map([
        ["floors", "floor"],
        ["walls", "walls"],
        ["door_and_windows", "door_and_windows"],
        ["furniture", "furniture"],
        ["eletronics", "eletronics"],
        ["utensils", "utensils"],
        ["goals", "interactive_elements"],
        ["persons", "persons"],
    ]);

    
    for (const layer in json.layers) {
        const sprites = json.layers[layer];

        // O NOME DA LAYER NO JSON OTIMIZADO É DIFERENTE DOS DEMAIS MAPEAMENTOS
                // POR ISSO TENHO QUE CONVERTER A NOMENCLATURA
        const nomeDaLayerNoMap = layersJSON.get(layer);

        // PEGANDO TILES MAPEADOS DE UMA LAYER ESPECIFICA
        const pesquisaDeSpritePorLayer = pesquisaDeSprite.get(nomeDaLayerNoMap);

        const tileMapLayers = tilemap.layers.find( layer => layer.id === nomeDaLayerNoMap);

        for (const item of sprites) {
            if (item.start && item.end) {
                const spriteDefinition = pesquisaDeSpritePorLayer.get(item.type);
                if (!spriteDefinition) continue;

                for (let y = item.start[1]; y <= item.end[1]; y++) {
                    for (let x = item.start[0]; x <= item.end[0]; x++) {
                        tileMapLayers.sprites.push({
                            ...spriteDefinition,
                            x: x,
                            y: y,
                            category: nomeDaLayerNoMap,
                            children: [{ x, y, codigo: item.type }]
                        });
                    }
                }

            }
            else if (item.pos) {
                const anchorCode = item.type;

                const [anchorX, anchorY] = item.pos;
                
                const spriteDefinition = pesquisaDeSpritePorLayer.get(anchorCode);
                if (!spriteDefinition) continue;

                const { layout } = spriteDefinition;
                
                const [cols, rows] = [layout[0].length, layout.length];
                
                // Encontra a posição relativa da âncora dentro do seu próprio layout.
                const relativePos = findCodeInLayout(layout, anchorCode);
                if (!relativePos) continue;

                // Calcula o canto superior esquerdo do objeto.
                const topLeftX = anchorX - relativePos.col;
                const topLeftY = anchorY - relativePos.row;

                const newChildren = [];
                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        newChildren.push({
                            x: topLeftX + c,
                            y: topLeftY + r,
                            codigo: layout[r][c]
                        });
                    }
                }

                tileMapLayers.sprites.push({
                    ...spriteDefinition,
                    x: topLeftX,
                    y: topLeftY,
                    size: [cols, rows],
                    category: nomeDaLayerNoMap,
                    children: newChildren
                });
            }
        }
        
    }

    return tilemap;
    
}