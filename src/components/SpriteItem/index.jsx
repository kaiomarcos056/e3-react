import styles from './SpriteItem.module.css'

import { useTileMap } from "../../contexts/TileMapContext";

import { FaTrash } from 'react-icons/fa';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

export function SpriteItem({ sprite, layerId }) {

    const {t} = useTranslation();

    const { setTilemap, setSelectedLayerSprite } = useTileMap();

    const toggleVisibleTile = () => {
        setTilemap(prev => ({
            ...prev,
            layers: prev.layers.map(layer => {
                if (layer.id !== layerId) return layer;

                return {
                    ...layer,
                    sprites: layer.sprites.map(s =>
                        s.x === sprite.x && s.y === sprite.y
                        ? { ...s, visible: !s.visible }
                        : s
                    ),
                };
            }),
        }));
    };

    const removeTile = () => {
        setTilemap(prev => ({
            ...prev,
            layers: prev.layers.map(layer => {
                if (layer.id !== layerId) return layer;
                return {
                    ...layer,
                    sprites: layer.sprites.filter(s => !(s.x === sprite.x && s.y === sprite.y)),
                };
            }),
        }));
    };

    const handleSpriteClick = () => {
        setSelectedLayerSprite({ ...sprite, category: layerId });
    };

    return(
        <div className={styles.subLayerTile}>
            <div onClick={handleSpriteClick} className={styles.subLayerTileName} tabIndex={0}>
                <label>{t(sprite.translate)}</label>
                <label>{sprite.x}x{sprite.y}</label>
            </div>
            <div>
                <button onClick={toggleVisibleTile} className={styles.subLayerTileButtons} aria-label="visualizar tile">
                    {sprite.visible ? <IoMdEye/> : <IoMdEyeOff/>}
                </button>
                <button onClick={removeTile} className={styles.subLayerTileButtons} aria-label="Deletar tile">
                    <FaTrash/>
                </button>
            </div>
        </div>
    )
}