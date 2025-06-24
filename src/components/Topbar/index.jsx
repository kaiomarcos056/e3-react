import styles from './Topbar.module.css';

import { useTranslation } from 'react-i18next';

export function Topbar({ 
    children, 
    icone, 
    titulo , 
    estilo = {}, 
    isActive, 
    onToggle, 
    margin = 0,
    position = 'right'
 }) {

    const {t} = useTranslation();

    return (
        <div 
            className={styles.sidebarContainer} 
            style={{
                ...estilo,
                [position === 'right' ? 'right' : 'left']: 0
            }}>
            <button
                className={`${styles.sidebarToggleButton} ${isActive ? styles.inside : styles.outside}`}
                style={{marginRight: margin+'px'}}
                onClick={onToggle}
                tabIndex={0}
                aria-label={t(`${titulo}`)}
                aria-selected={isActive}
                role="option"
            >
                {icone}
            </button>

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