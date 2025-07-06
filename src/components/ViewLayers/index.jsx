import styles from './ViewLayers.module.css'

import { useTileMap } from '../../contexts/TileMapContext';
import { FaEye } from 'react-icons/fa6';
import { Sidebar } from '../Sidebar';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function ViewLayers(){
    const {t} = useTranslation();

    const { tilemap, setTilemap } = useTileMap();

    const toggleLayerSpritesVisibility = (layerId, checked) => {
        setTilemap(prevTilemap => ({
            ...prevTilemap,
            layers: prevTilemap.layers.map(layer => {
                if (layer.id !== layerId) return layer;

                const updatedSprites = layer.sprites.map(sprite => ({
                    ...sprite,
                    visible: checked
                }));

                return {
                    ...layer,
                    sprites: updatedSprites
                };
            })
        }));
    };

    const {
        isDisplayOpen, setIsDisplayOpen, setDisplacementSidebarDisplay,
        setIsHelpOpen, 
        setIsAttributesOpen,
        setSettingsOpen
    } = useTileMap();

    const handleDisplayOpen = () => {
        setIsDisplayOpen(!isDisplayOpen);
        setIsHelpOpen(false);
        setIsAttributesOpen(false);
    }

    useEffect(() => {
        if(isDisplayOpen) {
            setSettingsOpen(false);
        }
    }, [isDisplayOpen])

    return (
        <Sidebar
            title="Exibir"
            icon={<FaEye/>}
            borderTopLeftRadiusButton={15}
            borderBottomLeftRadiusButton={15}
            borderTopLeftRadiusBody={15}
            positionLeft={0}
            positionBottom={36}
            horizontalAlignment="bottom"
            verticalAlignment="left"
            active={isDisplayOpen}
            toggleSidebar={isDisplayOpen}
            onClick={handleDisplayOpen}
            setDisplacementSidebar={setDisplacementSidebarDisplay}
        >
            <div>
                <ul className={styles.layerItens}>
                {tilemap.layers.map(layer => (
                    <li key={layer.id} className={styles.layerItem}>
                        <label className={styles.customCheckbox}>
                            <input
                                className={styles.layerCheckbox}
                                type="checkbox"
                                checked={layer.sprites.some(sprite => sprite.visible)}
                                onChange={e => toggleLayerSpritesVisibility(layer.id, e.target.checked)}
                                tabIndex={0}
                            />
                            <span className={styles.checkmark}></span>
                            {t(layer.id)}
                        </label>
                    </li>
                ))}
                </ul> 
            </div>
        </Sidebar>
    )
}