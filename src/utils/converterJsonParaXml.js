/**
 * Converte o formato de mapa JSON (com sprites e children) para uma string XML
 * no formato legado esperado.
 *
 * @param {object} mapaJson O objeto JSON completo do seu editor.
 * @returns {string} Uma string contendo o mapa formatado em XML.
 */
export function converterJsonParaXml(mapaJson) {
    const { width, height, tileSize, layers } = mapaJson;
    const VOID_ID = "-1";

    // Mapeamento dos IDs do seu JSON para os nomes de camada esperados no XML.
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

    // 1. CRIA AS GRADES PARA CADA CAMADA
    const grids = {};
    for (const layer of layers) {
        // Usa o mapeamento para obter o nome correto da camada no XML.
        const xmlLayerName = layerNameMapping[layer.id];
        if (xmlLayerName) {
            // Cria uma grade vazia para esta camada, preenchida com o ID de vazio.
            grids[xmlLayerName] = Array(height).fill(0).map(() => Array(width).fill(VOID_ID));
        }
    }

    // 2. PREENCHE AS GRADES COM OS DADOS DOS 'CHILDREN'
    for (const layer of layers) {
        const xmlLayerName = layerNameMapping[layer.id];
        if (!xmlLayerName) continue; // Pula se a camada não tiver um mapeamento

        // Para cada sprite na camada...
        for (const sprite of layer.sprites) {
            // ...itera sobre seus children.
            if (sprite.children && sprite.children.length > 0) {
                for (const child of sprite.children) {
                    // Coloca o código do child na posição (x, y) correta na grade correspondente.
                    if (child.y < height && child.x < width) {
                        grids[xmlLayerName][child.y][child.x] = String(child.codigo);
                    }
                }
            }
        }
    }

    // 3. GERA AS STRINGS XML PARA AS CAMADAS
    let layersXmlString = '';
    for (const layerName in grids) {
        const grid = grids[layerName];
        // Converte a matriz 2D em uma única string, com colunas separadas por ',' e linhas por ',\n'.
        const layerDataString = grid.map(row => row.join(',')).join(',\n');
        
        // Monta a tag <layer> para a camada atual.
        layersXmlString += `
        <layer name="${layerName}" tileset="${layerName}">
            ${layerDataString}
        </layer>`;
    }

    // 4. MONTA O DOCUMENTO XML FINAL
    // Nota: Os valores de imagewidth e imageheight são placeholders, pois não existem no seu JSON de entrada.
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

    // Retorna a string XML final, removendo espaços em branco extras do início/fim.
    return xmlFinal.trim();
}
