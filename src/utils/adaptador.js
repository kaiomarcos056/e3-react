/**
 * Converte o formato de mapa JSON da sua aplicação (com a estrutura 'children')
 * para o formato intermediário E3Map, que a lógica de otimização entende.
 *
 * @param {object} appJson O objeto JSON completo do seu editor.
 * @returns {object} Um objeto no formato E3Map, pronto para ser otimizado.
 */
export function adaptarAppJsonParaE3Map(appJson) {
    // 1. EXTRAÇÃO DE DADOS BÁSICOS
    const { width, height, tileSize, layers } = appJson;
    const VOID_ID = "-1"; // ID para células vazias.

    // Calcula o tamanho do mapa em pixels, como o formato E3Map espera.
    const tamanhoEmPixels = [width * tileSize, height * tileSize];

    // 2. CRIAÇÃO DAS GRADES VAZIAS
    // Mapeamento dos IDs do seu JSON para os nomes de camada do E3Map.
    const layerNameMapping = {
        floor: 'floor',
        walls: 'walls', // Note que o seu JSON usa 'wall', mas o E3Map espera 'walls'.
        door_and_windows: 'door_and_windows',
        furniture: 'furniture',
        eletronics: 'eletronics',
        utensils: 'utensils',
        interactive_elements: 'interactive_elements',
        persons: 'persons'
    };

    const grids = {};
    // Itera sobre o mapeamento para criar uma grade vazia para cada camada que a lógica de otimização conhece.
    for (const key in layerNameMapping) {
        const e3mapLayerName = layerNameMapping[key];
        grids[e3mapLayerName] = Array(height).fill(0).map(() => Array(width).fill(VOID_ID));
    }

    // 3. PREENCHIMENTO DAS GRADES USANDO OS 'CHILDREN'
    // Itera sobre cada camada do seu JSON de entrada.
    for (const layer of layers) {
        
        // Encontra o nome correspondente no formato E3Map.
        const targetGridName = layerNameMapping[layer.id];
        if (!targetGridName) continue; // Pula se a camada não for reconhecida.
        
        // Pega a referência para a grade que vamos preencher.
        const targetGrid = grids[targetGridName];

        // Itera sobre cada sprite "pai" na camada.
        for (const sprite of layer.sprites) {
            // A LÓGICA PRINCIPAL: Itera sobre o array 'children' do sprite.
            if (sprite.children && sprite.children.length > 0) {
                for (const child of sprite.children) {
                    // Pega as coordenadas e o código de cada "pedaço".
                    const { x, y, codigo } = child;
                    
                    // Verifica se a posição está dentro dos limites do mapa.
                    if (y < height && x < width) {
                        // "Carimba" o código na posição correta da grade.
                        targetGrid[y][x] = String(codigo);
                    }
                }
            }
        }
    }

    // 4. MONTAGEM DO OBJETO E3MAP FINAL
    // Retorna o objeto completo com o tamanho em pixels e todas as grades preenchidas.
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
