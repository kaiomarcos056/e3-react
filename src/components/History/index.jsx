import styles from './History.module.css'

import { useTileMap } from '../../contexts/TileMapContext';
import { useState } from 'react';

import { Tooltip } from '../Tooltip';

import { FaHistory } from "react-icons/fa";

export function History(){

    const { setTilemap, history, setHistory } = useTileMap();

    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });

    const handleMouseMove = (e, name) => {
        setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            text: name
        });
    }

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, text: '' });
    };

    function handleUndo() {
        if (history.length > 0) {
            const lastTilemap = history[history.length - 1];
            setTilemap(lastTilemap);
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    }

    return(
        <>
        <button 
            className={styles.historyButton} 
            onClick={handleUndo}
            aria-label="desfazer"
            tabIndex={0}
            onMouseMove={(e) => handleMouseMove(e, "Desfazer")}
            onMouseLeave={handleMouseLeave}
        >
            <FaHistory />
        </button>

        {tooltip.visible && (
          <Tooltip texto={tooltip.text} x={tooltip.x} y={tooltip.y}/>
        )}
        </>
    )
}