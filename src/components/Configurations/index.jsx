import styles from './Settings.module.css'

import { useEffect, useState } from "react";

import { IoIosSettings } from "react-icons/io";

import {useTranslation} from 'react-i18next';
import { useTileMap } from '../../contexts/TileMapContext';
import { Button } from '../Button';
import { DimensionConfiguration } from '../DimensionConfiguration';
import { LanguageConfiguration } from '../LanguageConfiguration';
import { ToggleButton } from '../ToggleButton';

export function Configuration(){

    const {
        settingsOpen, setSettingsOpen, 
        setIsAttributesOpen, 
        setIsHelpOpen,
        setIsDisplayOpen
    } = useTileMap();

    const [isSoundFeedback, setIsSoundFeedback] = useState(false);
    const [isAdvancedMode, setIsAdvancedMode] = useState(false);

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    useEffect(() => {
        if(settingsOpen) {
            setIsAttributesOpen(false);
            setIsHelpOpen(false);
            setIsDisplayOpen(false);
        }
    }, [settingsOpen])

    const {t} = useTranslation();

    return(
        <div className={styles.container}>
            <div className={styles.button}>
                <Button
                    info={t('settings')}
                    borderTopLeftRadius={15}
                    borderTopRightRadius={15}
                    borderBottomRightRadius={15}
                    borderBottomLeftRadius={15}
                    onClick={toggleSettings}
                    active={settingsOpen}
                >
                    <IoIosSettings/>
                </Button>
            </div>

            {settingsOpen && (
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h2>{t('settings')}</h2>
                        <div className={styles.divider}></div>
                    </div>
                    
                    <DimensionConfiguration/>
                    
                    <LanguageConfiguration/>
                    
                    <div>
                        <h4 className={styles.title}>{t('sound_feedback')}</h4>
                        <ToggleButton ativo={isSoundFeedback} onChange={setIsSoundFeedback} />
                    </div>

                    <div>
                        <h4 className={styles.title}>{t('advanced_mode')}</h4>
                        <ToggleButton ativo={isAdvancedMode} onChange={setIsAdvancedMode} />
                    </div>
                </div>
            )}
        </div>
    )
}