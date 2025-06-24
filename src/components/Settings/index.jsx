import styles from './Settings.module.css'

import { useState } from "react";

import { IoIosSettings } from "react-icons/io";

import { CanvasDimensions } from '../CanvasDimensions';

import {useTranslation} from 'react-i18next';
import { useTileMap } from '../../contexts/TileMapContext';

export function Settings(){
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleSettings = () => {
    //     setIsOpen(!isOpen);
    // };

    const {settingsOpen, setSettingsOpen, setSidebarGroupOpen} = useTileMap();
    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
        setSidebarGroupOpen(null);
    };

    const {t} = useTranslation();

    return(
        <div className={`${styles.container}`}>

            <button 
                className={`${styles.card} ${settingsOpen ? styles.open : styles.closed}`} 
                onClick={toggleSettings}
                aria-label='configuração'
                aria-selected={settingsOpen}
                tabIndex={0}
                role="option"
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
        </div>
    )
}