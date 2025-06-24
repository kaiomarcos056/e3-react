import styles from './Banner.module.css'

import { useTranslation } from 'react-i18next';

export function Banner({img,titulo}){

    const {t} = useTranslation();

    return(
        <div 
            className={styles.banner} 
            style={{ 
                background: `url(/banners/${img})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
            tabIndex={0}
            aria-label={t(`${titulo}`)}
        >
            <div className={styles.bannerContent}>
                <h4>{t(`${titulo}`)}</h4>
            </div>
        </div>
    )
}