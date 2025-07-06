import { useEffect, useState } from 'react';
import styles from './Modal.module.css';

import { IoMdClose } from "react-icons/io";

export function Modal({ 
    onConfirm,
    buttons = true,
    children,
    active = false,
    setActive,
    showButtonClose = false,
    title
}){

    // const [isOpen, setIsOpen] = useState(active)

    // useEffect(() => {
    //     setIsOpen(active);
    // }, [active]);

    if (!active) return null;

    return(
        
        <div className={styles.overlay}>
            {/* onClick={(e) => e.stopPropagation()} */}
            <div className={styles.modal}>

                {showButtonClose && 
                    <button 
                        className={styles.closeButton} 
                        onClick={() => setActive(false)} 
                        aria-label="Fechar modal"
                    > 
                        × 
                    </button>
                }

                <div className={styles.header}>
                    <h4 className={styles.title}>
                        {title}
                    </h4>
                </div>

                <div className={styles.body}>
                    {children}
                </div>

                <div className={styles.footer}>
                    {buttons &&
                        <div className={styles.buttons}>
                            <button 
                                className={styles.butonPrimary} 
                                onClick={onConfirm}
                            >
                                Sim
                            </button>
                            
                            <button 
                                className={styles.butonSecundary} 
                                onClick={() => setActive(false)}
                            >
                                Não
                            </button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}