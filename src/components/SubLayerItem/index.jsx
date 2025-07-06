import styles from './SubLayerItem.module.css'

import { useTileMap } from "../../contexts/TileMapContext";
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { BiSolidDownArrow, BiSolidLeftArrow } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa';
import { SpriteList } from '../SpriteList';
import { useTranslation } from 'react-i18next';

export function SubLayerItem({ layerId, name, sprites, isOpen, toggleSubLayer }) {

    const {t} = useTranslation();

    const { setTilemap } = useTileMap();

    const toggleVisibleTileGroup = () => {
        setTilemap(prev => ({
            ...prev,
            layers: prev.layers.map(layer => {
                if (layer.id !== layerId) return layer;

                const anyVisible = layer.sprites.some(s => s.name === name && s.visible);
                return {
                    ...layer,
                    sprites: layer.sprites.map(s =>
                        s.name === name ? { ...s, visible: !anyVisible } : s
                    ),
                };
            }),
        }));
    }

    const handleDeleteGroup = () => {
        setTilemap(prev => ({
            ...prev,
            layers: prev.layers.map(layer => {
                if (layer.id !== layerId) return layer;
                return {
                    ...layer,
                    sprites: layer.sprites.filter(sprite => sprite.name !== name),
                };
            }),
        }));
    }

    const isGroupVisible = sprites.some(sprite => sprite.visible);

    return(
        <li>
            <div className={`${styles.subLayer} ${isOpen ? styles.subactivated : styles.subdeactivate}`}>
                <div onClick={toggleSubLayer} className={styles.subLayerName} tabIndex={0}>
                    <label>{t(sprites[0].translate)}</label>
                    <label>x{sprites.length}</label>
                </div>

                <div className={styles.subLayerButtons}>
                    <button onClick={toggleVisibleTileGroup} className={styles.subLayerButton} aria-label="Visualizar">
                        {isGroupVisible ? <IoMdEye/> : <IoMdEyeOff/>}
                    </button>

                    <button onClick={handleDeleteGroup} className={styles.subLayerButton} aria-label="Deletar grupo de layer">
                        <FaTrash/>
                    </button>

                    <button onClick={toggleSubLayer} className={styles.subLayerButton} aria-label="Expandir grupo de layer">
                        {isOpen ? <BiSolidDownArrow/> : <BiSolidLeftArrow/>}
                    </button>
                </div>
            </div>

            {isOpen && <SpriteList sprites={sprites} layerId={layerId} />}
        </li>
    )
}