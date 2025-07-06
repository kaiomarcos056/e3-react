import styles from './DimensionConfiguration.module.css'
import { useState } from 'react';
import { useTileMap } from '../../contexts/TileMapContext';
import { useTranslation } from 'react-i18next';

export function DimensionConfiguration(){

    const { t } = useTranslation();

    const { tilemap, setTilemap } = useTileMap();

    const [formWidth, setFormWidth] = useState(tilemap.width);
    const [formHeight, setFormHeight] = useState(tilemap.height);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Novo tamanho da grade vindo dos inputs
        const newWidth = formWidth;
        const newHeight = formHeight;

        // Atualiza o tilemap mantendo apenas os sprites dentro da nova área
        const updatedTilemap = {
            ...tilemap,
            width: newWidth,
            height: newHeight,
            layers: tilemap.layers.map(layer => {
                return {
                    ...layer,
                    sprites: layer.sprites.filter(sprite => {
                        // Remove sprites com posição fora dos novos limites
                        return sprite.x < newWidth && sprite.y < newHeight;
                    })
                };
            })
        };

        setTilemap(updatedTilemap);
    };

    return(
        <div>
            <h4 className={styles.title}>
                {t('canvas_dimension')}
            </h4>
            
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputDimension}>
                    <label htmlFor="altura" className={styles.label}>{t('height')}</label>
                    <input
                        className={styles.inputNumber}
                        type="number" 
                        id="altura" 
                        min={2} 
                        value={formHeight} 
                        onChange={(e) => setFormHeight(Number(e.target.value))} 
                    />
                </div>
            
                <p className={styles.paragraph}> X </p>
            
                <div className={styles.inputDimension}>
                    <label htmlFor="largura" className={styles.label}>{t('width')}</label>
                    <input
                        className={styles.inputNumber}
                        type="number" 
                        id="largura" 
                        min={2} 
                        value={formWidth} 
                        onChange={(e) => setFormWidth(Number(e.target.value))} 
                    />
                </div>

                <button className={styles.inputButton}>{t('change')}</button>
            </form>
        </div>
    )
}