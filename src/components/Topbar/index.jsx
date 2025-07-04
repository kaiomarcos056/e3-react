import styles from './Topbar.module.css';

import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Tooltip } from '../Tooltip';

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

    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });

    const handleMouseMove = (e, name) => {
        setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            text: t(name)
        });
    }

    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, text: '' });
    };

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
                onMouseMove={(e) => handleMouseMove(e, titulo)}
                onMouseLeave={handleMouseLeave}
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

            {tooltip.visible && (
                <Tooltip texto={tooltip.text} x={tooltip.x} y={tooltip.y}/>
            )}
        </div>
    );
}