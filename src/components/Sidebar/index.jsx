import { useState } from 'react';

import styles from './Sidebar.module.css';

export function Sidebar( { titulo, icon, estilo, children, isOpen, onToggle, styleCard = {} }) {

  // const [sidebarOpen, setSidebarOpen] = useState(false);

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
        style={styleCard}
        aria-label={`${titulo}`}
        aria-selected={isOpen}
        tabIndex={0}
        // role="region"
      >
        {icon}
      </button>
      
    </div>
  );
};
