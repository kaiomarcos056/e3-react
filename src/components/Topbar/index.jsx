import styles from './Topbar.module.css';

import { useTranslation } from 'react-i18next';

export function Topbar({ children , icone, titulo , estilo = {}, isActive, onToggle, margin = 0 }) {

    const {t} = useTranslation();

    return (
        <div 
            className={styles.sidebarContainer} 
            style={estilo}
        >
            <div
                className={`${styles.sidebarToggleButton} ${isActive ? styles.inside : styles.outside}`}
                style={{marginRight: margin+'px'}}
                onClick={onToggle}
            >
                {icone}
            </div>

            <div className={`${styles.sidebar} ${isActive ? styles.expanded : 'collapsed'}`}>
                {isActive && (
                    <>
                        <div className={styles.sidebarBody}> 
                            {children}
                        </div>
                        <div className={styles.sidebarHeader}>
                            <span>{t(`${titulo}`)}</span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}