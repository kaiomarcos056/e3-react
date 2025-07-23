import styles from './TilemapCanvas.module.css'

import { useEffect, useRef, useState } from "react";
import { useTileMap } from '../../contexts/TileMapContext';
import { useSpriteSheetMap } from '../../hook/useSpriteSheetMap';

import { AccessibleGridOverlay } from '../AccessibleGridOverlay';
import { spritesMap } from '../../SpritesMap';
import { FaArrowsRotate, FaTrash } from "react-icons/fa6";

export function TilemapCanvas() {
    const spriteSheetMap = useSpriteSheetMap(spritesMap);

    const { 
        tilemap, setTilemap, 
        selectedSprite, 
        selectedLayerSprite, setSelectedLayerSprite, 
        setHistory,
        hoverCell, setHoverCell,
        selectedLayer, setSelectedLayer
    } = useTileMap();

    const TILE_SIZE = tilemap.tileSize;
    const NUM_ROWS = tilemap.height;
    const NUM_COLS = tilemap.width;

    const canvasRef = useRef(null);

    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [isDrawing, setIsDrawing] = useState(false);

    function drawTilemap(ctx, tilemap, gridSize) {
        if (!ctx) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        tilemap.layers.forEach(layer => {
            if (layer.visible === false) return;

            layer.sprites.forEach(sprite => {
                if (!sprite.visible) return;

                const image = spriteSheetMap[sprite.path];
                if (!image) return;

                const [cols = 1, rows = 1] = sprite.size || [];

                const width = cols * gridSize;
                const height = rows * gridSize;
                const rotation = sprite.rotation || 0;

                const x = sprite.x * gridSize;
                const y = sprite.y * gridSize;

                ctx.save();
               
                ctx.translate(x + width / 2, y + height / 2);
                
                ctx.drawImage(
                    image,
                    -width / 2,
                    -height / 2,
                    width,
                    height
                );

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

        resizeCanvas();

        const observer = new ResizeObserver(resizeCanvas);
        observer.observe(canvas);

        return () => observer.disconnect();
    }, []);

    
    useEffect(() => { 
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

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
            ctx.strokeStyle = 'rgba(1, 159, 206, 1)';
            ctx.lineWidth = 2;
            ctx.strokeRect( hoverCell.col * TILE_SIZE, hoverCell.row * TILE_SIZE, TILE_SIZE * spriteCols, TILE_SIZE * spriteRows );
            ctx.restore();
        }

        if (selectedLayerSprite) {
            
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
            
            const alreadyExists = layer.sprites.some(sprite =>
                sprite.x === col &&
                sprite.y === row &&
                sprite.path === selectedSprite.path
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

    const handleMouseDown = (e) => {
        if (e.button === 0) {
            setIsDrawing(true);
            addSpriteAt(e);
        }
        else if (e.button === 2) {
            const canvas = canvasRef.current;
            if (!canvas || !selectedSprite) return;

            const rect = canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;

            const canvasX = (mouseX - canvas.width / 2 - offset.x) / scale + (NUM_COLS * TILE_SIZE) / 2;
            const canvasY = (mouseY - canvas.height / 2 - offset.y) / scale + (NUM_ROWS * TILE_SIZE) / 2;
            
            const col = Math.floor(canvasX / TILE_SIZE);
            const row = Math.floor(canvasY / TILE_SIZE);

            const layer = tilemap.layers.find(l => l.id === selectedLayer);

            for (const sprite of layer.sprites) {
                if (sprite.children) {
                    const found = sprite.children.find(child => child.x === col && child.y === row);
                    if(found){
                        setSelectedLayerSprite({...sprite})
                    }
                }
            }
        }
    };

    const handleMouseMove = (e) => {
        updateHoverCell(e);

        if (isDrawing) addSpriteAt(e); 
    };

    const handleMouseUp = () => {
        setIsDrawing(false);
    };

    const handleMouseLeave = () => {
        setIsDrawing(false);
        setHoverCell(null);
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

        setHistory(prev => [...prev, structuredClone(tilemap)]);

        const { x, y, category } = selectedLayerSprite;

        const updatedLayers = tilemap.layers.map(layer => {

            if (layer.id !== category) return layer;

            const updatedSprites = layer.sprites.map(sprite => {
                
                if (sprite.x === x && sprite.y === y) {
                    
                    const availableRotationKeys = Object.keys(sprite.rotations);
                    
                    if (availableRotationKeys.length <= 1) {
                        return sprite;
                    }

                    const availableRotations = availableRotationKeys.map(Number).sort((a, b) => a - b);

                    const currentRotation = sprite.rotation || 0;
                    
                    const currentIndex = availableRotations.indexOf(currentRotation);

                    const nextIndex = (currentIndex + 1) % availableRotations.length;

                    const newRotation = availableRotations[nextIndex];
                    
                    const rotationData = sprite.rotations[newRotation];

                    const newLayout = rotationData.layout;
                    
                    const newRows = newLayout.length;
                    const newCols = newLayout[0].length;
                    const newSize = [newCols, newRows];
                    
                    const newChildren = [];
                    for (let r = 0; r < newRows; r++) {
                        for (let c = 0; c < newCols; c++) {
                            newChildren.push({
                                x: sprite.x + c,
                                y: sprite.y + r,
                                codigo: newLayout[r][c]
                            });
                        }
                    }

                    return {
                        ...sprite,
                        category: category,
                        rotation: newRotation,
                        path: rotationData.path,
                        anchor_code: rotationData.anchor_code,
                        size: newSize,
                        children: newChildren,
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

        const updatedSprite = updatedLayers
            .find(l => l.id === category)
            ?.sprites.find(s => s.x === x && s.y === y);

        if (updatedSprite) {
            setSelectedLayerSprite(updatedSprite);
        }
    };

    const handleDeleteTile = () => {
        if (!selectedLayerSprite) return;

        setHistory(prev => [...prev, structuredClone(tilemap)]);

        const { x, y, category } = selectedLayerSprite;

        const updatedLayers = tilemap.layers.map(layer => {
            if (layer.id !== category) return layer;

            const updatedSprites = layer.sprites.filter(sprite => 
                !(sprite.x === x && sprite.y === y)
            );

            return { ...layer, sprites: updatedSprites };
        });

        setTilemap(prev => ({
            ...prev,
            layers: updatedLayers,
        }));

        setSelectedLayerSprite(null);
    };

    return (
        <div className={styles.container}>
            <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onContextMenu={(e) => e.preventDefault()}
            className={styles.canvas}
            />
            
            {selectedLayerSprite && (
            (() => {
                const [spriteCols = 1] = selectedLayerSprite.size || [];

                const leftPosition = getButtonPositionX(selectedLayerSprite.x);

                const rightPosition = getButtonPositionX(selectedLayerSprite.x + spriteCols);
                
                const topPosition = getButtonPositionY(selectedLayerSprite.y);

                return (
                    <>
                        <button
                            style={{
                                position: 'absolute',
                                top: topPosition,
                                left: leftPosition,
                                zIndex: 10,
                                transform: 'translate(-60%, -90%)', 
                            }}
                            className={styles.rotateButton}
                            onClick={handleRotateTile}
                        >
                            <FaArrowsRotate />
                        </button>

                        <button
                            style={{
                                position: 'absolute',
                                top: topPosition,
                                left: rightPosition,
                                zIndex: 10,
                                transform: 'translate(-40%, -90%)',
                            }}
                            className={styles.rotateButton}
                            onClick={handleDeleteTile}
                        >
                            <FaTrash />
                        </button>
                    </>
                );
            })()
        )}

            <AccessibleGridOverlay
                rows={NUM_ROWS}
                cols={NUM_COLS}
                cellSize={TILE_SIZE}
                getTileInfo={(r, c) => tilemap.layers[0].sprites.find(s => s.x === c && s.y === r)}
            />
        </div>
    );
}
