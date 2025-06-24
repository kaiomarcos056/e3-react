import { useState, useRef } from 'react';
import { Stage, Layer, Rect, Group } from 'react-konva';
import { Image as KonvaImage } from 'react-konva';

import useImage from 'use-image';

import { useMemo } from 'react';

import { useTileMap } from './contexts/TileMapContext';
import { spritesMap } from './SpritesMap';
import { AccessibleGridOverlay } from './components/AccessibleGridOverlay';

const GRID_SIZE = 32;

function TileMapEditor() {

  const { tilemap, setTilemap, selectedSprite, selectedLayerSprite, setSelectedLayerSprite, stageRef, stageSize, setHistory } = useTileMap();

  const [hoverImage] = useImage(selectedSprite.path);

  const [iconRotate] = useImage("/arrows-rotate-solid.svg");

  // HOVER DA GRID
  const [hoverCell, setHoverCell] = useState({ gridX: -1, gridY: -1 });

  const allSpritePaths = spritesMap.flatMap(category =>
    category.sprites.map(sprite => sprite.path)
  );

  const images = allSpritePaths.map((path) => {
    const [image] = useImage(path);
    return { path, image };
  });

  
  const spriteSheetMap = useMemo(() => {
    const map = {};
    images.forEach(({ path, image }) => {
      map[path] = image;
    });
    return map;
  }, [images]);

  const numCols = tilemap.width;
  const numRows = tilemap.height;

  const [isPanActive, setIsPanActive] = useState(false);
  
  const isDrawing = useRef(false);
  const lastDrawnCell = useRef(null);

  const isDragging = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  const GRID_WIDTH = GRID_SIZE * numCols;
  const GRID_HEIGHT = GRID_SIZE * numRows;

  const centerX = (stageSize.width - GRID_WIDTH) / 2;
  const centerY = (stageSize.height - GRID_HEIGHT) / 2;

  const handleClick = (x, y) => {
      const gridX = Math.floor(x / GRID_SIZE);
      const gridY = Math.floor(y / GRID_SIZE);

      const { cols = 1, rows = 1 } = selectedSprite.size || {};

      if(gridX != selectedLayerSprite.x || gridY != selectedLayerSprite.y) setSelectedLayerSprite({})

      // Impede inserção fora dos limites
      if (
        gridX < 0 ||
        gridY < 0 ||
        gridX + cols > numCols ||
        gridY + rows > numRows
      ) return;

      // Verifica sobreposição com sprites existentes na mesma camada
      const layer = tilemap.layers.find(l => l.id === selectedSprite.category);
      if (!layer) return;

      const isOccupied = layer.sprites.some(sprite => {
    const { x: sx, y: sy, size = { cols: 1, rows: 1 } } = sprite;

    for (let dy1 = 0; dy1 < rows; dy1++) {
      for (let dx1 = 0; dx1 < cols; dx1++) {
        const tx1 = gridX + dx1;
        const ty1 = gridY + dy1;

        for (let dy2 = 0; dy2 < size.rows; dy2++) {
          for (let dx2 = 0; dx2 < size.cols; dx2++) {
            const tx2 = sx + dx2;
            const ty2 = sy + dy2;

            //if (tx1 === tx2 && ty1 === ty2) { return true; // célula sobreposta }
            if (tx1 === tx2 && ty1 === ty2) {
  // Permite substituir se for a mesma posição e mesmo tamanho
  if (
    sprite.x === gridX &&
    sprite.y === gridY &&
    size.cols === cols &&
    size.rows === rows
  ) {
    continue; // ignora essa colisão, pois é o mesmo sprite
  }

  return true; // célula sobreposta por outro sprite
}
          }
        }
      }
    }

    return false;
  });

  if (isOccupied) {
    return;
  }

      const updatedLayers = tilemap.layers.map(layer => {
        if (layer.id !== selectedSprite.category) return layer;

        // Remove sprite anterior se já existe exatamente no mesmo lugar
        const updatedSprites = layer.sprites.filter(
          sprite => !(sprite.x === gridX && sprite.y === gridY)
        );

        // Adiciona novo sprite composto
        updatedSprites.push({
          x: gridX,
          y: gridY,
          rotation: 0,
          tileType: selectedSprite.id,
          spriteSheetPath: selectedSprite.path,
          name: selectedSprite.name,
          translate: selectedSprite.translate,
          visible: true,
          size: { cols, rows }
        });

        return {
          ...layer,
          sprites: updatedSprites
        };
      });

      // SALVANDO O ESTADO ANTIGO DO TILEMAP
      setHistory(prevHistory => [...prevHistory, tilemap]);

      setTilemap(prev => ({
        ...prev,
        layers: updatedLayers
      }));

  };

  const handleMouseDown = (e) => {
    if (isPanActive) {
      if (e.evt.button === 0) {
        isDragging.current = true;
        lastPos.current = { x: e.evt.clientX, y: e.evt.clientY };
      }
    } 
    else {
      if (e.evt.button === 0) {
        const stage = e.target.getStage();
        const pointer = stage.getPointerPosition();
        if (pointer) {
          const scale = stage.scaleX();
          const stageX = stage.x();
          const stageY = stage.y();

          const adjustedX = (pointer.x - stageX - centerX * scale) / scale;
          const adjustedY = (pointer.y - stageY - centerY * scale) / scale;

          isDrawing.current = true;
          lastDrawnCell.current = null;

          handleClick(adjustedX, adjustedY);
        }
      }
    }
  };

  const handleMouseMove = (e) => {
    const stage = e.target.getStage();
  const pointer = stage.getPointerPosition();
  if (!pointer) return;

  const scale = stage.scaleX();
  const stageX = stage.x();
  const stageY = stage.y();
  const adjustedX = (pointer.x - stageX - centerX * scale) / scale;
  const adjustedY = (pointer.y - stageY - centerY * scale) / scale;

  const gridX = Math.floor(adjustedX / GRID_SIZE);
  const gridY = Math.floor(adjustedY / GRID_SIZE);

  if (isPanActive && isDragging.current) {
    const dx = e.evt.clientX - lastPos.current.x;
    const dy = e.evt.clientY - lastPos.current.y;

    const newPos = {
      x: stage.x() + dx,
      y: stage.y() + dy,
    };
    stage.position(newPos);
    stage.batchDraw();

    lastPos.current = { x: e.evt.clientX, y: e.evt.clientY };
    return;
  }

  if (isDrawing.current && e.evt.buttons === 1) {
    if (
      !lastDrawnCell.current ||
      lastDrawnCell.current.gridX !== gridX ||
      lastDrawnCell.current.gridY !== gridY
    ) {
      handleClick(adjustedX, adjustedY);
      lastDrawnCell.current = { gridX, gridY };
    }
  }

  setHoverCell({ gridX, gridY });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
isDrawing.current = false;
lastDrawnCell.current = null;
  };

const handleRotate = () => {
    
      setTilemap(prevTilemap => {
        const newLayers = prevTilemap.layers.map(layer => {
          
          if (layer.id !== selectedLayerSprite.category) return layer;

          
          const updatedSprites = layer.sprites.map(sprite => {
            if (sprite.x === selectedLayerSprite.x && sprite.y === selectedLayerSprite.y) {
              const newRotation = sprite.rotation >= 270 ? 0 : sprite.rotation + 90;
              let offsetX = 0;
              let offsetY = 0;

              switch (newRotation) {
                case 90:
                  offsetX = 0;
                  offsetY = 32;
                  break;
                case 180:
                  offsetX = 32;
                  offsetY = 32;
                  break;
                case 270:
                  offsetX = 32;
                  offsetY = 0;
                  break;
                default:
                  offsetX = 0;
                  offsetY = 0;
              }

              return {
                ...sprite,
                rotation: newRotation,
                offsetX,
                offsetY,
              };
            }
            return sprite;
          });

          return {
            ...layer,
            sprites: updatedSprites,
          };
        });

        return {
          ...prevTilemap,
          layers: newLayers,
        };
      });
      

}

const handleImage = (layer, tile) => {
  // console.log(layer)
  // console.log()
  const layerData = localStorage.getItem(layer.id);
  if (!layerData) return spriteSheetMap[tile.spriteSheetPath];
  //console.log(layerName)

  try {
    const layerArray = JSON.parse(layerData);
    const foundTile = layerArray.find(t => t.name === tile.name);

    if (foundTile && foundTile.path) {
      const img = new window.Image();
      img.src = foundTile.path;
      return img;
    }
  }
  catch (e) {
  }

  return spriteSheetMap[tile.spriteSheetPath];
}

  return (
    <div>

      <Stage
        width={stageSize.width}
        height={stageSize.height}
        onWheel={(e) => {
          e.evt.preventDefault();

          const stage = e.target.getStage();
          const oldScale = stage.scaleX();
          const pointer = stage.getPointerPosition();
          if (!pointer) return;

          const scaleBy = 1.05;
          const direction = e.evt.deltaY > 0 ? -1 : 1;
          const newScale = direction > 0 ? oldScale * scaleBy : oldScale / scaleBy;

          const mousePointTo = {
            x: (pointer.x - stage.x()) / oldScale,
            y: (pointer.y - stage.y()) / oldScale,
          };

          stage.scale({ x: newScale, y: newScale });
          const newPos = {
            x: pointer.x - mousePointTo.x * newScale,
            y: pointer.y - mousePointTo.y * newScale,
          };

          stage.position(newPos);
          stage.batchDraw();
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onContextMenu={(e) => { }}
        ref={stageRef}
      >
        
        {tilemap.layers.map( (layer) => { 
          if (layer.visible === false) return null;
          
          return (
            <Layer key={layer.name}>
              <Group x={centerX} y={centerY}>
                {layer.sprites.map((tile, index) => {

                  if(!tile.visible) return;

                  //const image = spriteSheetMap[tile.spriteSheetPath];
                  const image = handleImage(layer, tile);

                  return (
                    <Group key={index}>
                      
                      <KonvaImage
                        image={image}
                        x={tile.x * GRID_SIZE}
                        y={tile.y * GRID_SIZE}
                        width={(tile.size?.cols || 1) * GRID_SIZE}
                        height={(tile.size?.rows || 1) * GRID_SIZE}
                        offset={{
                          x: tile.offsetX * tile.size.cols, 
                          y: tile.offsetY * tile.size.rows,
                        }}
                        rotation={tile.rotation}
                      />
                      
                    </Group>
                  )

                })}
              </Group>
            </Layer>
          )

        })}

        {/* GRID */}
        <Layer>
          <Group x={centerX} y={centerY}>
            {[...Array(numRows)].map((_, row) =>
              [...Array(numCols)].map((_, col) => (
                <Rect
                  key={`grid-${row}-${col}`}
                  x={col * GRID_SIZE}
                  y={row * GRID_SIZE}
                  width={GRID_SIZE}
                  height={GRID_SIZE}
                  stroke="#3e3e3e"
                  strokeWidth={0.5}
                />
              ))
            )}
          </Group>
        </Layer>

        {/* HOVER */}
        <Layer>
          <Group x={centerX} y={centerY}>
            {[...Array(numRows)].map((_, row) =>
              [...Array(numCols)].map((_, col) => {
                const isSpecialCell = row === hoverCell.gridY && col === hoverCell.gridX;
                
                if (!isSpecialCell) return null;

                const { cols = 1, rows = 1 } = selectedSprite.size || {};

                return (
                  <Group>
                    <KonvaImage
                    image={hoverImage}
                    x={col * GRID_SIZE}
                    y={row * GRID_SIZE}
                    width={GRID_SIZE*cols}
                    height={GRID_SIZE*rows}
                    opacity={0.5} // valor entre 0 (invisível) e 1 (opaco)
                  />
                  <Rect
                    key={`grid-${row}-${col}`}
                    x={col * GRID_SIZE}
                    y={row * GRID_SIZE}
                    width={GRID_SIZE*cols}
                    height={GRID_SIZE*rows}
                    stroke="#019FCE"
                    strokeWidth={1}
                  />
                  </Group>
                )
              })
            )}
          </Group>
        </Layer>

        {/* SELEÇÃO */}
        <Layer>
          <Group x={centerX} y={centerY}>
            {[...Array(numRows)].map((_, row) =>
              [...Array(numCols)].map((_, col) => {

                const isSpecialCell = row === selectedLayerSprite.y && col === selectedLayerSprite.x; // y = 2, x = 0
                
                if (!isSpecialCell) return null;

                const rectX = col * GRID_SIZE;
                const rectY = row * GRID_SIZE;

                return (
                  <Group>
                  <Rect
                    key={`grid-${row}-${col}`}
                    x={col * GRID_SIZE}
                    y={row * GRID_SIZE}
                    width={GRID_SIZE * selectedLayerSprite.size.cols}
                    height={GRID_SIZE * selectedLayerSprite.size.rows}
                    stroke="#019FCE"
                    strokeWidth={1}
                  />

                  {/* Simulando um botão */}
                  <Group
                    x={rectX-6.5}
                    y={rectY-7.5}
                    onMouseDown={(e) => {
                      e.cancelBubble = true;
                    }}
                    onClick={(e) => {
                      e.cancelBubble = true;
                      handleRotate();
                    }}
                    cursor="pointer"
                  >
                    <Rect width={8} height={8} cornerRadius={20} fill="#019FCE" />
                    <KonvaImage
                        image={iconRotate}
                        x={1.5}
                        y={1.5}
                        width={5}
                        height={5}
                    />
                  </Group>

                  </Group>
                )

              })
            )}
          </Group>
        </Layer>    
      </Stage>

      <AccessibleGridOverlay
        rows={numRows}
        cols={numCols}
        cellSize={GRID_SIZE}
        getTileInfo={(r, c) => tilemap.layers[0].sprites.find(s => s.x === c && s.y === r)}
        setTile={(r, c) => {
          // lógica para modificar o tile no mapa
        }}
      />

    </div>
  );
}

export default TileMapEditor;