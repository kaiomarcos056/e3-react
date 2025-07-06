import styles from './Button.module.css'

import { Tooltip } from '../Tooltip';
import { useState } from 'react';

export function Button({
    children,
    info = "",
    role = "button",
    ariaSelected = false,
    active = false,
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomRightRadius = 0,
    borderBottomLeftRadius = 0,
    style = {},
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
                borderRadius: `${borderTopLeftRadius}px ${borderTopRightRadius}px ${borderBottomRightRadius}px ${borderBottomLeftRadius}px`,
                ...style, 
            }}
            className={`${styles.button} ${active ? styles.active : ''}`}
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