import styles from './Settings.module.css'

import { useState } from "react";

import { IoIosSettings } from "react-icons/io";

import { CanvasDimensions } from '../CanvasDimensions';

import {useTranslation} from 'react-i18next';

export function Settings(){
    const [isOpen, setIsOpen] = useState(false);

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    const {t} = useTranslation();

    return(
        <div className={`${styles.container}`}>

            <div className={`${styles.card} ${isOpen ? styles.open : styles.closed}`} onClick={toggleSettings}>
                <IoIosSettings />
            </div>
            
            {isOpen && (
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