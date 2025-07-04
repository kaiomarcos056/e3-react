import styles from './Settings.module.css'

import { useState } from "react";

import { IoIosSettings } from "react-icons/io";

import { CanvasDimensions } from '../CanvasDimensions';

import {useTranslation} from 'react-i18next';
import { useTileMap } from '../../contexts/TileMapContext';
import { Tooltip } from '../Tooltip';

export function Settings(){

    const {settingsOpen, setSettingsOpen, setSidebarGroupOpen} = useTileMap();
    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
        setSidebarGroupOpen(null);
    };

    const {t} = useTranslation();

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

    return(
        <div className={`${styles.container}`}>

            <button 
                className={`${styles.card} ${settingsOpen ? styles.open : styles.closed}`} 
                onClick={toggleSettings}
                aria-label='configuração'
                aria-selected={settingsOpen}
                tabIndex={0}
                role="option"
                onMouseMove={(e) => handleMouseMove(e, "configurações")}
                onMouseLeave={handleMouseLeave}
            >
                <IoIosSettings />
            </button>
            
            {settingsOpen && (
            <div className={styles.content}>
                <div className={styles.header}>
                    <h2>{t("options")}</h2>
                </div>

                <CanvasDimensions/>
            </div>
            )}

            {tooltip.visible && (
                <Tooltip texto={tooltip.text} x={tooltip.x} y={tooltip.y}/>
            )}
        </div>
    )
}