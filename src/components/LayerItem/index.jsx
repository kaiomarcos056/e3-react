import styles from './LayerItem.module.css'

import { BiSolidDownArrow, BiSolidLeftArrow } from "react-icons/bi";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { IoLockOpen } from "react-icons/io5";

import { useTileMap } from "../../contexts/TileMapContext";
import { SubLayerList } from '../SubLayerList';
import { useTranslation } from 'react-i18next';

export function LayerItem({ layer, isOpen, toggleLayer }) {

    const {t} = useTranslation();

    const { setTilemap } = useTileMap();

    const toggleVisibleLayer = () => {
        setTilemap(prev => ({
            ...prev,
            layers: prev.layers.map(l => {
                if (l.id !== layer.id) return l;
                const anyVisible = l.sprites.some(sprite => sprite.visible);
                return {
                    ...l,
                    sprites: l.sprites.map(sprite => ({ ...sprite, visible: !anyVisible })),
                };
            }),
        }));
    };

    const isLayerVisible = layer.sprites.some(sprite => sprite.visible);

    return(
        <li>
            <div className={`${styles.layerItem} ${isOpen ? styles.activated : styles.deactivate}`}>
                <div
                    onClick={toggleLayer}
                    className={styles.layerName}
                    tabIndex={0}
                    aria-label="layer"
                >
                    {t(layer.id)}
                </div>

                <div className={styles.layerBotoes}>
                    <button onClick={toggleVisibleLayer} className={styles.layerBotao} aria-label="visualizar">
                        {isLayerVisible ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>
                    <button className={styles.layerBotao} aria-label="Trancar">
                        <IoLockOpen />
                    </button>
                    <button onClick={toggleLayer} className={styles.layerBotao} aria-label="Expandir layer">
                        {isOpen ? <BiSolidDownArrow /> : <BiSolidLeftArrow />}
                    </button>
                </div>
            </div>
   
            {isOpen && <SubLayerList layer={layer} />}
        </li>
    )
}