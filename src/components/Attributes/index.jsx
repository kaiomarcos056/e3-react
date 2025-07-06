import styles from './Attributes.module.css'

import { useEffect, useId, useState } from 'react';

import { FaRegFile, FaSlidersH } from "react-icons/fa";
import { ChangeTexture } from '../ChangeTexture';
import { Sidebar } from '../Sidebar';
import { useTileMap } from '../../contexts/TileMapContext';
import { useTranslation } from 'react-i18next';

export function Attributes(){
    const {t} = useTranslation();

    const [isModalTexture, setModalTexture] = useState(false);

    const {
        isAttributesOpen, setIsAttributesOpen, 
        setIsHelpOpen, displacementSidebarHelp,
        setIsDisplayOpen, displacementSidebarDisplay,
        setSettingsOpen
    } = useTileMap();

    const handleAttributesOpen = () => {
        setIsAttributesOpen(!isAttributesOpen);
        setIsHelpOpen(false);
        setIsDisplayOpen(false);
    }

    useEffect(() => {
        if(isAttributesOpen) setSettingsOpen(false);
    }, [isAttributesOpen]);

    return(
        <Sidebar
            title={t('sprite_attributes')}
            icon={<FaSlidersH/>}
            borderTopLeftRadiusButton={15}
            borderBottomLeftRadiusButton={15}
            borderTopLeftRadiusBody={15}
            positionBottom={176}
            horizontalAlignment="bottom"
            verticalAlignment="left"
            active={isAttributesOpen}
            toggleSidebar={isAttributesOpen}
            onClick={handleAttributesOpen}
            positionLeft={(displacementSidebarDisplay + displacementSidebarHelp)}
        >
            <div className={styles.container}>
                <section>
                    <h4 className={styles.title}>Alcance de Som</h4>
                    <div className={styles.inputSliderContainer}>
                        <input type="range" min="1" max="100" value="50"></input>
                        <label htmlFor="">1.50m</label>
                    </div>
                </section>
                <section>
                    <h4 className={styles.title}>Volume da Pista Sonora</h4>
                    <div className={styles.inputSliderContainer}>
                        <input type="range" min="1" max="100" value="50"></input>
                        <label htmlFor="">50%</label>
                    </div>
                </section>
                <section>
                    <h4 className={styles.title}>Trocar Som do Bloco</h4>
                    <div>
                        <label htmlFor="bloco" className={styles.fileTitle}>
                            <FaRegFile className={styles.fileIcon}/> 
                            Enviar Arquivo
                        </label>
                        <input type="file" id="bloco" className={styles.inputFile}></input>
                    </div>
                </section>
                <section>
                    <h4 className={styles.title}>Inserir Dica Sonora</h4>
                    <div>
                        <label htmlFor="som" className={styles.fileTitle}>
                            <FaRegFile className={styles.fileIcon}/> 
                            Enviar Arquivo
                        </label>
                        <input type="file" id="som" className={styles.inputFile}></input>
                    </div>
                </section>
                <section>
                    <ChangeTexture isOpen={isModalTexture} handleOpen={() => setModalTexture(false)} />

                    <h4 className={styles.title}>Trocar Textura do Bloco</h4>
                    <div>
                        <label htmlFor="textura" className={styles.fileTitle} onClick={() => setModalTexture(true)}>
                            <FaRegFile className={styles.fileIcon}/> 
                            Enviar Arquivo
                        </label>
                    </div>
                </section>
            </div>
        </Sidebar>
    )
}