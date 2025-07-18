import styles from './SubLayerList.module.css'

import { useState } from "react";

import { SubLayerItem } from '../SubLayerItem';

export function SubLayerList({ layer }) {

    const [openSubLayers, setOpenSubLayers] = useState({});

    const groupedSprites = layer.sprites.reduce((acc, sprite) => {
        if (!acc[sprite.name]) acc[sprite.name] = [];
        acc[sprite.name].push(sprite);
        return acc;
    }, {});

    const toggleSubLayer = (key) => {
        setOpenSubLayers(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return(
        <ul className={styles.sublayerList}>
            {Object.entries(groupedSprites).map(([name, sprites]) => {
                const key = `${layer.id}-${name}`;
                return (
                    <SubLayerItem
                        key={key}
                        layerId={layer.id}
                        name={name}
                        sprites={sprites}
                        isOpen={openSubLayers[key]}
                        toggleSubLayer={() => toggleSubLayer(key)}
                    />
                );
            })}
        </ul>
    )
}