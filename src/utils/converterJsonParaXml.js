export function converterJsonParaXml(mapaJson) {
    const { width, height, tileSize, layers } = mapaJson;
    const VOID_ID = "-1";

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
    for (const layer of layers) {
        const xmlLayerName = layerNameMapping[layer.id];
        if (xmlLayerName) {
            grids[xmlLayerName] = Array(height).fill(0).map(() => Array(width).fill(VOID_ID));
        }
    }

    for (const layer of layers) {
        const xmlLayerName = layerNameMapping[layer.id];
        if (!xmlLayerName) continue;

        for (const sprite of layer.sprites) {
            if (sprite.children && sprite.children.length > 0) {
                for (const child of sprite.children) {
                    if (child.y < height && child.x < width) {
                        grids[xmlLayerName][child.y][child.x] = String(child.codigo);
                    }
                }
            }
        }
    }

    let layersXmlString = '';
    for (const layerName in grids) {
        const grid = grids[layerName];
        const layerDataString = grid.map(row => row.join(',')).join(',\n');
        
        layersXmlString += `
        <layer name="${layerName}" tileset="${layerName}">
            ${layerDataString}
        </layer>`;
    }

    const xmlFinal = `
    <root xmlns="http://www.w3.org/1999/xhtml">
        <layers>
            ${layersXmlString}
        </layers>
        <tilesets>
            <tileset name="floor" image="floor" imagewidth="256" imageheight="64" tilewidth="${tileSize}" tileheight="${tileSize}"></tileset>
            <tileset name="walls" image="walls" imagewidth="224" imageheight="94" tilewidth="${tileSize}" tileheight="${tileSize}"></tileset>
            <tileset name="door_and_windows" image="door_and_windows" imagewidth="253" imageheight="96" tilewidth="${tileSize}" tileheight="${tileSize}"></tileset>
            <tileset name="furniture" image="furniture" imagewidth="256" imageheight="444" tilewidth="${tileSize}" tileheight="${tileSize}"></tileset>
            <tileset name="eletronics" image="eletronics" imagewidth="252" imageheight="127" tilewidth="${tileSize}" tileheight="${tileSize}"></tileset>
            <tileset name="utensils" image="utensils" imagewidth="246" imageheight="127" tilewidth="${tileSize}" tileheight="${tileSize}"></tileset>
            <tileset name="interactive_elements" image="interactive_elements" imagewidth="252" imageheight="124" tilewidth="${tileSize}" tileheight="${tileSize}"></tileset>
            <tileset name="persons" image="persons" imagewidth="121" imageheight="29" tilewidth="${tileSize}" tileheight="${tileSize}"></tileset>
        </tilesets>
        <canvas width="${width * tileSize}" height="${height * tileSize}">
        </canvas>
    </root>
`;

    return xmlFinal.trim();
}
