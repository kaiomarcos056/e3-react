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

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        tilemap.layers.forEach(layer => {
            if (layer.visible === false) return;

            layer.sprites.forEach(tile => {
                if (!tile.visible) return;

                // Recupera a imagem
                const image = spriteSheetMap[tile.path];
                if (!image) return;

                // Calcula posição x e y do tile
                const x = tile.x * gridSize;
                const y = tile.y * gridSize;

                // Calcula tamanho com cols e rows
                const width = (tile.size?.cols || 1) * gridSize;
                const height = (tile.size?.rows || 1) * gridSize;
                const rotation = tile.rotation || 0;

                // Calcula offset em pixels
                const offsetX = (tile.offsetX || 0) * (tile.size?.cols || 1);
                const offsetY = (tile.offsetY || 0) * (tile.size?.rows || 1);

                ctx.save();

                // Move para o centro do sprite para aplicar rotação
                ctx.translate(x + width / 2, y + height / 2);

                // Aplica rotação em graus (convertendo para rad)
                ctx.rotate((tile.rotation * Math.PI) / 180);

                // Quando for 90° ou 270°, apenas inverta a largura e altura no drawImage
                const drawWidth = (rotation === 90 || rotation === 270) ? height : width;
                const drawHeight = (rotation === 90 || rotation === 270) ? width : height;

                // Também o offset deve ser ajustado (importante!)
                const drawOffsetX = (rotation === 90 || rotation === 270) ? offsetY : offsetX;
                const drawOffsetY = (rotation === 90 || rotation === 270) ? offsetX : offsetY;

                // Desenha a imagem rotacionada, sem distorcer
                ctx.drawImage(
                    image,
                    -drawWidth / 2 - drawOffsetX,
                    -drawHeight / 2 - drawOffsetY,
                    drawWidth,
                    drawHeight
                );

                ctx.restore();
            })

            ctx.restore();
        })
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
            const spriteCols = selectedSprite?.size?.cols || 1;
            const spriteRows = selectedSprite?.size?.rows || 1;

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
            const spriteCols = selectedLayerSprite.size?.cols || 1;
            const spriteRows = selectedLayerSprite.size?.rows || 1;

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

    const handleCanvasClick = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const canvasX = (mouseX - canvas.width / 2 - offset.x) / scale + (NUM_COLS * TILE_SIZE) / 2;
        const canvasY = (mouseY - canvas.height / 2 - offset.y) / scale + (NUM_ROWS * TILE_SIZE) / 2;

        const col = Math.floor(canvasX / TILE_SIZE);
        const row = Math.floor(canvasY / TILE_SIZE);

        if (col >= 0 && col < NUM_COLS && row >= 0 && row < NUM_ROWS) {
            
            const updatedLayers = tilemap.layers.map(layer => {
                if (layer.id !== selectedSprite.category) return layer;

                const updatedSprites = layer.sprites.filter(
                    sprite => !(sprite.x === col && sprite.y === row)
                );

                updatedSprites.push({
                    ...selectedSprite,
                    x: col,
                    y: row,
                });

                return {
                    ...layer,
                    sprites: updatedSprites
                };
            })

            setTilemap(prev => ({
                ...prev,
                layers: updatedLayers
            }));
        }

        setSelectedLayerSprite(null)
    };

    // Quando pressionar o botão do mouse (início do desenho)
    const handleMouseDown = (e) => {
        setIsDrawing(true);

         // desenha imediatamente ao clicar
        drawAtCursor(e);
    };

    // Quando mover o mouse (desenha se estiver pressionado)
    const handleMouseMove = (e) => {
        // ainda atualiza a célula de hover
        updateHoverCell(e);

        // desenha se estiver pressionando
        if (isDrawing) drawAtCursor(e); 
    };

    // Quando soltar o botão do mouse
    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    // Se o mouse sair do canvas, pare o desenho
    const handleMouseLeave = () => {
        setIsDrawing(false);
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

    const handleRotateTile = () => {
        if (!selectedLayerSprite) return;

        let updateBorderSprite = false;

        const { x, y, category } = selectedLayerSprite;

        const updatedLayers = tilemap.layers.map(layer => {
            if (layer.id !== category) return layer;

            const updatedSprites = layer.sprites.map(sprite => {
                if (sprite.x === x && sprite.y === y) {
                    const currentRotation = sprite.rotation || 0;
                    const newRotation = (currentRotation + 90) % 360;

                    let newSize = { ...sprite.size };

                    if (sprite.size?.cols > 1 || sprite.size?.rows > 1) {
                        newSize = {
                            cols: sprite.size.rows,
                            rows: sprite.size.cols
                        };

                        updateBorderSprite = true;
                    }

                    return {
                        ...sprite,
                        rotation: newRotation,
                        size: newSize
                    };
                }
                return sprite;
            });

            return {
                ...layer,
                sprites: updatedSprites,
            };
        });

        setTilemap(prev => ({
            ...prev,
            layers: updatedLayers,
        }));

        if(updateBorderSprite){
            // Atualiza o selectedLayerSprite com nova rotação e size
            const updatedSprite = updatedLayers
                .find(l => l.id === category)
                .sprites.find(s => s.x === x && s.y === y);

            if (updatedSprite) setSelectedLayerSprite(updatedSprite);
        }
        
    };

    return (
        <div className={styles.container}>
            <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
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
