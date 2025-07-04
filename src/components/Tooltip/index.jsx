import styles from './Tooltip.module.css';

import { useTranslation } from 'react-i18next';

import { useEffect, useRef, useState } from "react";

export function Tooltip({texto = "", x = 0, y = 0}){

    const {t} = useTranslation();

    const tooltipRef = useRef(null);

    const [position, setPosition] = useState({ left: x + 10, top: y + 10 });

    useEffect(() => {
        const tooltipEl = tooltipRef.current;
        if (tooltipEl) {
            const { offsetWidth, offsetHeight } = tooltipEl;
            const padding = 10;
            let newX = x + padding;
            let newY = y + padding;

            if (x + offsetWidth + padding > window.innerWidth) {
                newX = x - offsetWidth - padding;
            }

            if (y + offsetHeight + padding > window.innerHeight) {
                newY = y - offsetHeight - padding;
            }

            setPosition({ left: newX, top: newY });
        }
    }, [x, y])

    return (
        <div
            ref={tooltipRef}
            className={styles.tooltipFloating}
            style={position}
        >
            {/* {t(texto)} */}
            texto
        </div>
    );
}