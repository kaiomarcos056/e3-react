import { useTileMap } from '../../contexts/TileMapContext';
import styles from './History.module.css'

import { FaHistory } from "react-icons/fa";

export function History(){

    const { setTilemap, history, setHistory } = useTileMap();

    function handleUndo() {
        if (history.length > 0) {
            const lastTilemap = history[history.length - 1];
            setTilemap(lastTilemap);
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    }

    return(
        <button 
            className={styles.historyButton} 
            onClick={handleUndo}
            aria-label="desfazer"
            tabIndex={0}
        >
            <FaHistory />
        </button>
    )
}