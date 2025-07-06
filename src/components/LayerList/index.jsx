import styles from './LayerList.module.css';

import { useEffect, useState } from "react";
import { useTileMap } from "../../contexts/TileMapContext";
import { LayerItem } from '../LayerItem';
import { Sidebar } from '../Sidebar';
import { LuClipboardList } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';

export function LayerList() {
    const {t} = useTranslation();

    const { tilemap } = useTileMap();
    const [openLayers, setOpenLayers] = useState({});

    const toggleLayer = (layerId) => {
        setOpenLayers(prev => ({ ...prev, [layerId]: !prev[layerId] }));
    };

    const { isElementsOpen, setIsElementsOpen, setIsMenuOpen, displacementSidebarMenu } = useTileMap();

    const handleElementsOpen = () => { setIsElementsOpen(!isElementsOpen); }

    useEffect(() => {
        if(isElementsOpen) setIsMenuOpen(false);
    }, [isElementsOpen])

    return (
        <Sidebar
            title={t('map_elements')}
            icon={<LuClipboardList/>}
            borderTopRightRadiusButton={15}
            borderBottomRightRadiusButton={15}
            borderBottomRightRadiusBody={15}
            positionTop={95}
            active={isElementsOpen}
            toggleSidebar={isElementsOpen}
            onClick={handleElementsOpen}
            positionRight={displacementSidebarMenu}
        >
            <ul className={styles.layerList}>
                {tilemap.layers
                    .filter(layer => layer.sprites.length > 0)
                    .map(layer => (
                        <LayerItem
                            key={layer.id}
                            layer={layer}
                            isOpen={openLayers[layer.id]}
                            toggleLayer={() => toggleLayer(layer.id)}
                        />
                ))}
            </ul>
        </Sidebar>
    )
}