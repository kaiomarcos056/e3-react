import { useEffect } from "react";
import styles from "./AccessibleGridOverlay.module.css";
import { useSpeech } from "../../hook/useSpeech";
import { useTileMap } from "../../contexts/TileMapContext";

export function AccessibleGridOverlay({ rows, cols, cellSize, getTileInfo, setTile }) {
    const { speak } = useSpeech();


    const { 
        tilemap, 
        setTilemap, 
        selectedSprite, 
        selectedLayerSprite, 
        setSelectedLayerSprite, 
        stageRef, 
        stageSize, 
        setHistory,
        hoverCell, setHoverCell
    } = useTileMap();

    const handleKeyDown = (e, row, col) => {
        const current = getTileInfo(row, col);
        if (e.key === " " || e.key === "Enter") {
            //setTile(row, col); // ou toggle tile, por exemplo
            //speak(`Marcado célula ${row + 1}, ${col + 1}`);
            //e.preventDefault();
            console.log(`COLUNA: ${col} - LINHA ${row}`)
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
        if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
            e.preventDefault();
            const nextRow = e.key === "ArrowDown" ? row + 1 : e.key === "ArrowUp" ? row - 1 : row;
            const nextCol = e.key === "ArrowRight" ? col + 1 : e.key === "ArrowLeft" ? col - 1 : col;

            const el = document.getElementById(`cell-${nextRow}-${nextCol}`);
            if (el) el.focus();
        }
    };

  const handleFocus = (row, col) => {
    setHoverCell({ row, col })
  }

  //const a = 100;

  return (
    <div
      className={styles.gridOverlay}
      style={{left: `-${cols*cellSize+1}px`}}
      role="grid"
      aria-label="Mapa interativo"
    >
      {[...Array(rows)].map((_, row) => (
        <div role="row" className={styles.row} key={row}>
          {[...Array(cols)].map((_, col) => {
            const tile = getTileInfo(row, col);
            return (
              <div
                key={col}
                id={`cell-${row}-${col}`}
                role="gridcell"
                tabIndex={0}
                // aria-label={`Célula linha ${row + 1}, coluna ${col + 1}, tipo: ${tile?.type ?? "vazio"}`}
                aria-label={`Célula linha ${row + 1}, coluna ${col + 1}`}
                className={styles.cell}
                // onFocus={() => speak(`Linha ${row + 1}, coluna ${col + 1}, tipo: ${tile?.type ?? "vazio"}`)}
                onFocus={() => handleFocus(row, col)}
                onKeyDown={(e) => handleKeyDown(e, row, col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}