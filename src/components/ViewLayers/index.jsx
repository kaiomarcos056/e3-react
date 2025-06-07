import styles from './ViewLayers.module.css'

import { useTileMap } from '../../contexts/TileMapContext';

export function ViewLayers(){
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
                    //   visible: checked,
                    sprites: updatedSprites
                };
            })
        }));
    };

    return (
        <div>
            <ul className={styles.layerItens}>
            {tilemap.layers.map(layer => (
                <li key={layer.id} className={styles.layerItem}>
                    <label>
                        <input
                            className={styles.layerCheckbox}
                            type="checkbox"
                            checked={layer.sprites.some(sprite => sprite.visible)}
                            onChange={e => toggleLayerSpritesVisibility(layer.id, e.target.checked)}
                        />
                        {layer.name}
                    </label>
                </li>
            ))}
            </ul> 
        </div>
    )
}