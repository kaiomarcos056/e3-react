import styles from './Card.module.css'

import { Tooltip } from '../Tooltip';
import { useState } from 'react';

export function Card({
    children,
    info = "",
    role = "button",
    ariaSelected = false,
    active = false,
    onClick
}){
    const defaultTooltop = { text: '', visible: false, x: 0, y: 0 };

    const [tooltip, setTooltip] = useState(defaultTooltop);

    const handleMouseMove = (e, name) => {
        setTooltip({
            text: name,
            visible: true,
            x: e.clientX,
            y: e.clientY
        });
    }

    const handleMouseLeave = () => { setTooltip(defaultTooltop); };

    return(
        <>
        <button
            aria-label={info}
            aria-selected={ariaSelected}
            role={role}
            style={{ 
                borderRadius: '10px',
                padding: '10px'
            }}
            className={`${styles.card} ${active ? styles.active : ''}`}
            onMouseLeave={handleMouseLeave}
            onMouseMove={(e) => handleMouseMove(e, info)}
            onClick={onClick}
        >
            {children}
        </button>

        {
            tooltip.visible && 
            (
                <Tooltip 
                    text={tooltip.text} 
                    x={tooltip.x} 
                    y={tooltip.y}
                />
            )
        }
        </>
    )
}