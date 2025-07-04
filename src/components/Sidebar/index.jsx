import { Tooltip } from '../Tooltip';
import styles from './Sidebar.module.css';

import { useState } from 'react';

export function Sidebar( { titulo, icon, estilo, children, isOpen, onToggle, styleCard = {} }) {

  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });

  const handleMouseMove = (e, name) => {
    setTooltip({
        visible: true,
        x: e.clientX,
        y: e.clientY,
        text: name
    });
  }
  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, text: '' });
  };

  return (
    <div className={styles.sidebarContainer} style={estilo}>
      {/* <div className={`${styles.sidebar} ${sidebarOpen ? styles.expanded : 'collapsed'}`}> */}
      <div className={`${styles.sidebar} ${isOpen ? styles.expanded : 'collapsed'}`}>
        {/* {sidebarOpen && ( */}
        {isOpen  && (
          <>
            <div className={styles.sidebarHeader}>
              <span>{titulo}</span>
            </div>

            <div className={styles.sidebarBody}>
              {children}
            </div>
          </>
        )}
      </div>

      <button
        // className={`${styles.sidebarToggleButton} ${sidebarOpen ? styles.inside : styles.outside}`}
        className={`${styles.sidebarToggleButton} ${isOpen ? styles.inside : styles.outside}`}
        // onClick={() => setSidebarOpen(!sidebarOpen)}
        onClick={onToggle}
        onMouseMove={(e) => handleMouseMove(e, titulo)}
        onMouseLeave={handleMouseLeave}
        style={styleCard}
        aria-label={`${titulo}`}
        aria-selected={isOpen}
        tabIndex={0}
        // role="region"
      >
        {icon}
      </button>
      
      {tooltip.visible && (
        <Tooltip texto={tooltip.text} x={tooltip.x} y={tooltip.y}/>
      )}

    </div>
  );
};
