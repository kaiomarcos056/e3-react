import { useTileMap } from '../../contexts/TileMapContext';
import styles from './TilemapCanvas.module.css'
import { useEffect, useRef, useState } from "react";
import { spritesMap } from '../../SpritesMap';
import { useSpriteSheetMap } from '../../hook/useSpriteSheetMap';
import { FaArrowsRotate } from "react-icons/fa6";
import { AccessibleGridOverlay } from '../AccessibleGridOverlay';

export function TilemapCanvas() {
    const spriteSheetMap = useSpriteSheetMap(spritesMap);

    //const { tilemap, setTilemap, selectedSprite, selectedLayerSprite, setSelectedLayerSprite, stageRef, stageSize,  } = useTileMap();
    const { 
        tilemap, setTilemap, 
        selectedSprite, 
        selectedLayerSprite, setSelectedLayerSprite, 
        setHistory,
        hoverCell, setHoverCell
    } = useTileMap();

    const TILE_SIZE = tilemap.tileSize;
    const NUM_ROWS = tilemap.height;
    const NUM_COLS = tilemap.width;

    const canvasRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    //const [hoverCell, setHoverCell] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);

    function drawTilemap(ctx, tilemap, gridSize) {
        if (!ctx) return;

        // Limpa o canvas para o redesenho.
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        tilemap.layers.forEach(layer => {
            if (layer.visible === false) return;

            layer.sprites.forEach(sprite => {
                if (!sprite.visible) return;

                const image = spriteSheetMap[sprite.path];
                if (!image) return;

                // 1. Pega o tamanho do sprite DIRETAMENTE do estado.
                //    Se o sprite foi rotacionado, o 'size' já estará correto (ex: [2, 1]).
                const [cols = 1, rows = 1] = sprite.size || [];

                // 2. Calcula a largura e altura em pixels com base nos dados corretos.
                const width = cols * gridSize;
                const height = rows * gridSize;
                const rotation = sprite.rotation || 0;

                // 3. Calcula a posição do canto superior esquerdo.
                //    (Esta lógica assume que x,y é o canto superior esquerdo. Se você mudar para âncora,
                //    a lógica de cálculo do topLeft que discutimos antes entraria aqui).
                const x = sprite.x * gridSize;
                const y = sprite.y * gridSize;

                // --- Lógica de Desenho e Rotação ---
                ctx.save();
                // Move o ponto de origem do canvas para o CENTRO do sprite.
                // Isso faz com que a rotação aconteça em torno do centro, e não do canto.
                ctx.translate(x + width / 2, y + height / 2);
                
                // 4. APLICA A ROTAÇÃO USANDO A API NATIVA DO CANVAS
                // Esta linha estava comentada, agora vamos usá-la.
                //ctx.rotate((rotation * Math.PI) / 180);

                // 5. REMOVEMOS A LÓGICA DE INVERSÃO MANUAL
                // A rotação já foi aplicada, então desenhamos com a largura e altura corretas.
                
                // const drawWidth = (rotation === 90 || rotation === 270) ? height : width; // REMOVIDO
                // const drawHeight = (rotation === 90 || rotation === 270) ? width : height; // REMOVIDO

                // Desenha a imagem.
                // - As coordenadas agora são relativas ao novo ponto de origem (-width/2, -height/2).
                ctx.drawImage(
                    image,
                    -width / 2, // Desenha a partir do centro
                    -height / 2,
                    width,      // Usa a largura correta
                    height      // Usa a altura correta
                );

                // Restaura o estado do canvas (remove a translação e rotação) para o próximo sprite.
                ctx.restore();
            });
        });
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const resizeCanvas = () => {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
        };

        // Resize na primeira renderização
        resizeCanvas();

        // Observa redimensionamento do canvas pai
        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(canvas);

        return () => observer.disconnect();
    }, []);

    // Redesenha sempre que o mapa ou imagem mudar
    useEffect(() => { 
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // Resetar transformações anteriores
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calcula o centro do canvas
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        ctx.translate(centerX + offset.x, centerY + offset.y);
        ctx.scale(scale, scale);
        ctx.translate(-(NUM_COLS * TILE_SIZE) / 2, -(NUM_ROWS * TILE_SIZE) / 2);

        drawTilemap(ctx, tilemap, TILE_SIZE);

        
        for (let y = 0; y < NUM_ROWS; y++) {
            for (let x = 0; x < NUM_COLS; x++) {
                ctx.strokeStyle = "rgba(0,0,0,0.2)";
                ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
            }
        }
        
        if (hoverCell) {
            // Usa o tamanho do sprite selecionado ou 1x1 como padrão
            const [spriteCols = 1, spriteRows = 1] = selectedSprite.size || [];

            const hoverImage = spriteSheetMap[selectedSprite.path];
            if (hoverImage) {
                ctx.save();
                ctx.globalAlpha = 0.7;
                ctx.drawImage(
                    hoverImage,
                    hoverCell.col * TILE_SIZE,
                    hoverCell.row * TILE_SIZE,
                    TILE_SIZE * spriteCols,
                    TILE_SIZE * spriteRows
                );
                ctx.restore();
            }
            ctx.save();
            ctx.strokeStyle = 'rgba(1, 159, 206, 1)'; // Cor da borda
            ctx.lineWidth = 2; // Largura da linha
            ctx.strokeRect( hoverCell.col * TILE_SIZE, hoverCell.row * TILE_SIZE, TILE_SIZE * spriteCols, TILE_SIZE * spriteRows ); // ctx.strokeRect(x, y, width, height)
            ctx.restore();
        }

        if (selectedLayerSprite) {
            // Usa o tamanho do sprite selecionado ou 1x1 como padrão
            //const [spriteCols = 1, spriteRows = 1] = selectedSprite.size || [];
            const [spriteCols = 1, spriteRows = 1] = selectedLayerSprite.size || [];

            ctx.save();
            ctx.strokeStyle = 'rgba(1, 159, 206, 1)';
            ctx.lineWidth = 2;
            ctx.strokeRect(
                selectedLayerSprite.x * TILE_SIZE,
                selectedLayerSprite.y * TILE_SIZE,
                TILE_SIZE * spriteCols,
                TILE_SIZE * spriteRows
            );
            ctx.restore();
        }
    }, [tilemap, scale, hoverCell, selectedLayerSprite]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const handleWheel = (e) => {
            e.preventDefault();

            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const canvasX = mouseX - canvas.width / 2 - offset.x;
            const canvasY = mouseY - canvas.height / 2 - offset.y;

            const zoomAmount = Math.sign(e.deltaY) * 0.1;
            const newScale = Math.max(0.5, Math.min(3, scale - zoomAmount));

            // Ajustar o offset para manter o foco sob o mouse
            const scaleRatio = newScale / scale;
            const newOffset = {
                x: offset.x - canvasX * (scaleRatio - 1),
                y: offset.y - canvasY * (scaleRatio - 1),
            };

            setScale(newScale);
            setOffset(newOffset);
        };

        canvas.addEventListener("wheel", handleWheel, { passive: false });
        return () => canvas.removeEventListener("wheel", handleWheel);
    }, [scale, offset]);

    const addSpriteAt = (e) => {
        const canvas = canvasRef.current;
        if (!canvas || !selectedSprite) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const canvasX = (mouseX - canvas.width / 2 - offset.x) / scale + (NUM_COLS * TILE_SIZE) / 2;
        const canvasY = (mouseY - canvas.height / 2 - offset.y) / scale + (NUM_ROWS * TILE_SIZE) / 2;
        
        const col = Math.floor(canvasX / TILE_SIZE);
        const row = Math.floor(canvasY / TILE_SIZE);

        if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
            
            const layerIndex = tilemap.layers.findIndex(l => l.id === selectedSprite.category);
            if (layerIndex === -1) return;

            const layer = tilemap.layers[layerIndex];
            
            // Lógica para não redesenhar se o mesmo sprite já existe na mesma posição.
            // Essencial para a funcionalidade de "arrastar" para desenhar.
            const alreadyExists = layer.sprites.some(sprite =>
                sprite.x === col &&
                sprite.y === row &&
                sprite.path === selectedSprite.path // Checa se é o mesmo tipo de sprite
            );
            if (alreadyExists) return;

            setHistory(prev => [...prev, structuredClone(tilemap)]);

            const updatedLayers = tilemap.layers.map((l, idx) => {
                if (idx !== layerIndex) return l;

                const updatedSprites = l.sprites.filter(
                    sprite => !(sprite.x === col && sprite.y === row)
                );

                const [cols, rows] = selectedSprite.size;
                const layout = selectedSprite.rotations[selectedSprite.rotation || '0'].layout;
                const children = [];

                for (let r = 0; r < rows; r++) {
                    for (let c = 0; c < cols; c++) {
                        const partX = col + c;
                        const partY = row + r;
                        const partCode = layout[r][c];
                        children.push({ x: partX, y: partY, codigo: partCode });
                    }
                }

                updatedSprites.push({
                    ...selectedSprite,
                    x: col,
                    y: row,
                    children: children
                });

                return { ...l, sprites: updatedSprites };
            });

            setTilemap(prev => ({
                ...prev,
                layers: updatedLayers
            }));
        }
        else{
            setSelectedLayerSprite(null)
        }
    };


    // Quando pressionar o botão do mouse (início do desenho)
    const handleMouseDown = (e) => {
        setIsDrawing(true);

        // desenha imediatamente ao clicar
        //drawAtCursor(e);
        addSpriteAt(e);
    };

    // Quando mover o mouse (desenha se estiver pressionado)
    const handleMouseMove = (e) => {
        // ainda atualiza a célula de hover
        updateHoverCell(e);

        // desenha se estiver pressionando
        //if (isDrawing) drawAtCursor(e); 
        if (isDrawing) addSpriteAt(e); 
    };

    // Quando soltar o botão do mouse
    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Se o mouse sair do canvas, pare o desenho
    const handleMouseLeave = () => {
        setIsDrawing(false);
        setHoverCell(null);
    };

    const drawAtCursor = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const canvasX = (mouseX - canvas.width / 2 - offset.x) / scale + (NUM_COLS * TILE_SIZE) / 2;
        const canvasY = (mouseY - canvas.height / 2 - offset.y) / scale + (NUM_ROWS * TILE_SIZE) / 2;

        const col = Math.floor(canvasX / TILE_SIZE);
        const row = Math.floor(canvasY / TILE_SIZE);

        if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
            const layerIndex = tilemap.layers.findIndex(l => l.id === selectedSprite.category);
            if (layerIndex === -1) return;

            const layer = tilemap.layers[layerIndex];

            const alreadyExists = layer.sprites.some(sprite =>
                sprite.x === col &&
                sprite.y === row &&
                sprite.path === selectedSprite.path
            );

            if (alreadyExists) return; // já existe, então não salva nem atualiza

            // Salva o estado antes da alteração
            setHistory(prev => [...prev, structuredClone(tilemap)]);

            // Atualiza o tilemap
            const updatedLayers = tilemap.layers.map((l, idx) => {
                if (idx !== layerIndex) return l;

                const updatedSprites = l.sprites.filter(
                    sprite => !(sprite.x === col && sprite.y === row)
                );

                updatedSprites.push({ ...selectedSprite, x: col, y: row });

                return { ...l, sprites: updatedSprites };
            });

            setTilemap(prev => ({
                ...prev,
                layers: updatedLayers
            }));
        }
    };

    const updateHoverCell = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        const canvasX = (mouseX - centerX - offset.x) / scale + (NUM_COLS * TILE_SIZE) / 2;
        const canvasY = (mouseY - centerY - offset.y) / scale + (NUM_ROWS * TILE_SIZE) / 2;

        const col = Math.floor(canvasX / TILE_SIZE);
        const row = Math.floor(canvasY / TILE_SIZE);

        if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
            setHoverCell({ row, col });
        } 
        else {
            setHoverCell(null);
        }
    };

    const getButtonPositionX = (col) => {
        const canvas = canvasRef.current;
        if (!canvas) return 0;

        const canvasCenterX = canvas.width / 2;
        const worldX = col * TILE_SIZE;
        const screenX = (worldX - (NUM_COLS * TILE_SIZE) / 2) * scale + canvasCenterX + offset.x;
        return screenX;
    };

    const getButtonPositionY = (row) => {
        const canvas = canvasRef.current;
        if (!canvas) return 0;

        const canvasCenterY = canvas.height / 2;
        const worldY = row * TILE_SIZE;
        const screenY = (worldY - (NUM_ROWS * TILE_SIZE) / 2) * scale + canvasCenterY + offset.y;
        return screenY;
    };

    // A função completa e corrigida para rotacionar um sprite.
    const handleRotateTile = () => {
        console.log(JSON.stringify(selectedLayerSprite))
        // 1. VERIFICAÇÃO INICIAL
        // Garante que há um sprite selecionado para rotacionar.
        if (!selectedLayerSprite) return;

        // Salva o estado atual no histórico para permitir o "desfazer".
        setHistory(prev => [...prev, structuredClone(tilemap)]);

        // Pega as coordenadas e a categoria do sprite selecionado para encontrá-lo no mapa.
        const { x, y, category } = selectedLayerSprite;

        // 2. ATUALIZAÇÃO IMUTÁVEL DO MAPA
        // Itera sobre as camadas para encontrar a camada correta.
        const updatedLayers = tilemap.layers.map(layer => {
            // Se não for a camada do nosso sprite, retorna a camada sem modificações.
            if (layer.id !== category) return layer;

            // Itera sobre os sprites da camada correta para encontrar o sprite a ser rotacionado.
            const updatedSprites = layer.sprites.map(sprite => {
                // Encontra o sprite "pai" pela sua posição (que é o canto superior esquerdo).
                if (sprite.x === x && sprite.y === y) {
                    
                    // --- LÓGICA PRINCIPAL DA ROTAÇÃO ---

                    // a. Pega as chaves do objeto 'rotations' (ex: ['0', '90', '180'])
                    const availableRotationKeys = Object.keys(sprite.rotations);
                    
                    // b. Se houver apenas uma ou nenhuma rotação definida, não há nada a fazer.
                    if (availableRotationKeys.length <= 1) {
                        return sprite;
                    }

                    // c. Converte as chaves para números e as ordena em ordem crescente.
                    const availableRotations = availableRotationKeys.map(Number).sort((a, b) => a - b);

                    // d. Encontra o índice da rotação atual na nossa lista de rotações disponíveis.
                    const currentRotation = sprite.rotation || 0;
                    
                    const currentIndex = availableRotations.indexOf(currentRotation);

                    // e. Calcula o índice da PRÓXIMA rotação na lista.
                    // O operador de módulo (%) garante que, se estivermos no último item,
                    // o próximo índice será 0 (voltando para o início do ciclo).
                    const nextIndex = (currentIndex + 1) % availableRotations.length;

                    // f. Pega o valor da nova rotação a partir da lista.
                    const newRotation = availableRotations[nextIndex];
                    
                    // --- FIM DA LÓGICA DE ROTAÇÃO ---

                    // g. Busca a definição para a nova rotação.
                    const rotationData = sprite.rotations[newRotation];

                    // d. Pega o novo layout e calcula o novo tamanho.
                    const newLayout = rotationData.layout;
                    
                    // O novo tamanho é a dimensão do layout (número de linhas x número de colunas da primeira linha).
                    const newRows = newLayout.length;
                    const newCols = newLayout[0].length;
                    const newSize = [newCols, newRows];
                    
                    // e. RECONSTRÓI O ARRAY 'children' com base no novo layout.
                    const newChildren = [];
                    for (let r = 0; r < newRows; r++) {
                        for (let c = 0; c < newCols; c++) {
                            newChildren.push({
                                x: sprite.x + c, // A posição do pai (canto superior esquerdo) + deslocamento
                                y: sprite.y + r,
                                codigo: newLayout[r][c]
                            });
                        }
                    }

                    // f. Retorna um objeto de sprite completamente novo e atualizado.
                    return {
                        ...sprite, // Mantém propriedades originais como 'name', 'category', etc.
                        category: category,
                        rotation: newRotation,
                        path: rotationData.path,
                        anchor_code: rotationData.anchor_code,
                        size: newSize,
                        children: newChildren, // Substitui os children antigos pelos novos.
                    };
                }
                // Se não for o sprite que queremos rotacionar, retorna ele sem modificações.
                return sprite;
            });

            // Retorna a camada com a lista de sprites atualizada.
            return {
                ...layer,
                sprites: updatedSprites,
            };
        });

        // 3. ATUALIZA O ESTADO GLOBAL
        // Atualiza o estado do tilemap com as novas camadas.
        setTilemap(prev => ({
            ...prev,
            layers: updatedLayers,
        }));

        // 4. ATUALIZA A SELEÇÃO (PARA A BORDA AZUL)
        // Após a rotação, o sprite selecionado pode ter mudado de tamanho.
        // Precisamos atualizar o 'selectedLayerSprite' para que a borda azul de seleção se redimensione corretamente.
        const updatedSprite = updatedLayers
            .find(l => l.id === category)
            ?.sprites.find(s => s.x === x && s.y === y);

        if (updatedSprite) {
            setSelectedLayerSprite(updatedSprite);
        }
    };


    return (
        <div className={styles.container}>
            <canvas
            ref={canvasRef}
            // onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={styles.canvas}
            />
            
            {selectedLayerSprite && (
            <button
                style={{
                    position: 'absolute',
                    top: getButtonPositionY(selectedLayerSprite.y),
                    left: getButtonPositionX(selectedLayerSprite.x),
                    zIndex: 10,
                    transform: 'translate(-50%, -100%)',
                }}
                className={styles.rotateButton}
                onClick={handleRotateTile}
            >
                <FaArrowsRotate />
            </button>
            )}

            <AccessibleGridOverlay
                rows={NUM_ROWS}
                cols={NUM_COLS}
                cellSize={TILE_SIZE}
                getTileInfo={(r, c) => tilemap.layers[0].sprites.find(s => s.x === c && s.y === r)}
                // setTile={(r, c) => { lógica para modificar o tile no mapa }} 
            />
        </div>
    );
}
