import { useState, useRef } from 'react';

import styles from './CanvasDimensions.module.css';

import { useTileMap } from "../../contexts/TileMapContext";
import { ToggleButton } from '../ToggleButton';

import { useTranslation } from 'react-i18next';

export function CanvasDimensions(){
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

    const [ativoo, setAtivoo] = useState(false);
    const [ativooo, setAtivooo] = useState(false);


    const [selected, setSelected] = useState("brazil");

    const flags = [
        { id: "brazil", src: "flags/flag_brazil.png", alt: "Brazil", lng: "pt" },
        { id: "spain", src: "flags/flag_spain.png", alt: "Spain", lng: "es" },
        { id: "usa", src: "flags/flag_usa.png", alt: "United States", lng: "en" },
    ];

    const { i18n } = useTranslation();
    const { t } = useTranslation();

    const handleSelectFlag = (flag) => {
        setSelected(flag.id);
        i18n.changeLanguage(flag.lng);
    };

    return(
        <div className={styles.container}>
        <section>
            <h4>{t("canvas_dimension")}</h4>
            <form onSubmit={handleSubmit} className={styles.formDimension}>
                <div className={styles.inputDimension}>
                    <label htmlFor="altura" className={styles.inputLabel}>{t("height")}</label>
                    <input 
                        type="number" 
                        id="altura" 
                        min={2} 
                        value={formHeight} 
                        onChange={(e) => setFormHeight(Number(e.target.value))} 
                    />
                </div>

                <p className={styles.inputParagrafo}>
                    X
                </p>

                <div className={styles.inputDimension}>
                    <label htmlFor="largura" className={styles.inputLabel}>{t("width")}</label>
                    <input 
                        type="number" 
                        id="largura" 
                        min={2} 
                        value={formWidth} 
                        onChange={(e) => setFormWidth(Number(e.target.value))} 
                    />
                </div>
                <button className={styles.inputButton}>
                    OK
                </button>
            </form>
        </section>

        <section>
            <h4>{t("language")}</h4>
            <div className={styles.containerLanguage}> 
                {flags.map((flag) => (
                    <label key={flag.id} className={styles.labelFlag}>
                        <input 
                            type="radio" 
                            name="flag" 
                            value={flag.id} 
                            checked={selected === flag.id} 
                            onChange={() => handleSelectFlag(flag)}
                            className={styles.radioFlag}
                        />
                        <img  
                            src={flag.src} 
                            alt={flag.alt} 
                            width="40" 
                            className={`${styles.imgFlag} ${selected === flag.id ? styles.selected : ""}`}
                        />
                    </label>
                ))}
            </div>
        </section>
        
        <section>
            <h4>{t("sound_feedback")}</h4>
            <ToggleButton ativo={ativoo} onChange={setAtivoo} />
        </section>

        <section>
            <h4>{t("advanced_mode")}</h4>
            <ToggleButton ativo={ativooo} onChange={setAtivooo} />
        </section>
        </div>
    )
}