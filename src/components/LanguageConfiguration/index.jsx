import styles from './LanguageConfiguration.module.css'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const flags = [
    { 
        id: "brazil", 
        src: "flags/flag_brazil.png", 
        alt: "Brazil", 
        lng: "pt" 
    },
    { 
        id: "spain", 
        src: "flags/flag_spain.png", 
        alt: "Spain", 
        lng: "es" 
    },
    { 
        id: "usa", 
        src: "flags/flag_usa.png", 
        alt: "United States", 
        lng: "en" 
    },
];

export function LanguageConfiguration(){

    const { i18n } = useTranslation();
    const {t} = useTranslation();

    const [selected, setSelected] = useState("brazil");

    const handleSelectFlag = (flag) => {
        setSelected(flag.id);
        i18n.changeLanguage(flag.lng);
    };

    return(
        <div>
            <h4 className={styles.title}>{t('language')}</h4>
            <div className={styles.container}> 
                {flags.map((flag) => (
                    <label key={flag.id} className={styles.label}>
                        <input 
                            type="radio" 
                            name="flag" 
                            value={flag.id} 
                            checked={selected === flag.id} 
                            onChange={() => handleSelectFlag(flag)}
                            className={styles.radio}
                        />
                        <img  
                            src={flag.src} 
                            alt={flag.alt} 
                            width="40" 
                            className={`${styles.img} ${selected === flag.id ? styles.selected : ''}`}
                        />
                    </label>
                ))}
            </div>
        </div>
    )
}