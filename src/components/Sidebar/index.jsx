import styles from './Sidebar.module.css'

import { Button } from '../Button'
import { SidebarBody } from '../SidebarBody'
import { SidebarHeader } from '../SidebarHeader'
import { useEffect, useRef } from 'react';
import { useTileMap } from '../../contexts/TileMapContext';

export function Sidebar({
    children, 
    icon, 
    title, 
    horizontalAlignment = "top", 
    verticalAlignment = "right",
    borderTopLeftRadiusButton = 0,
    borderTopRightRadiusButton = 0,
    borderBottomRightRadiusButton = 0,
    borderBottomLeftRadiusButton = 0,
    borderTopLeftRadiusBody = 0,
    borderTopRightRadiusBody = 0,
    borderBottomRightRadiusBody = 0,
    borderBottomLeftRadiusBody = 0,
    positionRight,
    positionLeft,
    positionTop,
    positionBottom,
    toggleSidebar = false,
    onClick,
    setDisplacementSidebar,
    active = false
}){
    const contentRef = useRef(null);
    useEffect(() => {
        if (contentRef.current && typeof setDisplacementSidebar === 'function') {
            const currentWidth = contentRef.current.offsetWidth;
            setDisplacementSidebar(currentWidth);
        }
    }, [toggleSidebar]);

    return(
        <div 
            className={styles.container}
            style={{
                flexDirection: `${verticalAlignment == 'right' ? 'row' : 'row-reverse'}`,
                ...(positionTop != null && { top: `${positionTop}px` }),
                ...(positionBottom != null && { bottom: `${positionBottom}px` }),
                ...(positionLeft != null && { right: `${positionLeft}px` }),
                ...(positionRight != null && { left: `${positionRight}px` }),
            }}
        >
            
            <div 
                ref={contentRef}
                className={styles.content}
                style={{
                    flexDirection: `${horizontalAlignment == 'top' ? 'column': 'column-reverse'}`,
                    display: `${toggleSidebar ? '' : 'none'}`
                }}
            >
                <SidebarHeader title={title}/>
                <SidebarBody
                    borderTopLeftRadius={borderTopLeftRadiusBody}
                    borderTopRightRadius={borderTopRightRadiusBody}
                    borderBottomRightRadius={borderBottomRightRadiusBody}
                    borderBottomLeftRadius={borderBottomLeftRadiusBody}
                    vertical={horizontalAlignment}
                >
                    {children}
                </SidebarBody>
            </div>

            <Button 
                info={title}
                borderTopLeftRadius={borderTopLeftRadiusButton}
                borderTopRightRadius={borderTopRightRadiusButton}
                borderBottomRightRadius={borderBottomRightRadiusButton}
                borderBottomLeftRadius={borderBottomLeftRadiusButton}
                style={{alignSelf:`${horizontalAlignment == 'top' ? 'start': 'end'}`}}
                onClick={onClick}
                active={active}
            >
                {icon}
            </Button>
        </div>
    )
}