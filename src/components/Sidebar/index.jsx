import { useState } from 'react';

import styles from './Sidebar.module.css';

export function Sidebar( { titulo, icon, estilo, children }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.sidebarContainer} style={estilo}>
      <div className={`${styles.sidebar} ${sidebarOpen ? styles.expanded : 'collapsed'}`}>
        {sidebarOpen && (
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

      <div
        className={`${styles.sidebarToggleButton} ${sidebarOpen ? styles.inside : styles.outside}`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {icon}
      </div>
      
    </div>
  );
};
