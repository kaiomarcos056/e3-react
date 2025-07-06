import styles from './SpriteList.module.css'

import { SpriteItem } from '../SpriteItem'

export function SpriteList({ sprites, layerId }) {
    return (
        <div className={styles.subLayerItem}>
            {sprites.map((sprite, index) => (
                <SpriteItem key={index} sprite={sprite} layerId={layerId} />
            ))}
        </div>
    )
}