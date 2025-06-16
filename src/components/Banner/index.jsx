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
        >
            <div className={styles.bannerContent}>
                <h4>{t(`${titulo}`)}</h4>
            </div>
        </div>
    )
}