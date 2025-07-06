import styles from './Undo.module.css'

import { useTileMap } from '../../contexts/TileMapContext';

import { FaHistory } from "react-icons/fa";

import { Button } from '../Button'
import { useTranslation } from 'react-i18next';

export function Undo(){
    const {t} = useTranslation();

    const { setTilemap, history, setHistory } = useTileMap();

    function handleUndo() {
        if (history.length > 0) {
            const lastTilemap = history[history.length - 1];
            setTilemap(lastTilemap);
            setHistory(prevHistory => prevHistory.slice(0, -1));
        }
    }

    return(
        <div className={styles.positions}>
            <Button
                info={t('undo')}
                borderTopLeftRadius={15}
                borderTopRightRadius={15}
                borderBottomLeftRadius={15}
                borderBottomRightRadius={15}
                onClick={handleUndo}
            >
                <FaHistory/>
            </Button>
        </div>
    )
}