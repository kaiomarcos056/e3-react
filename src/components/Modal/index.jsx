import styles from './Modal.module.css';

export function Modal({ isOpen, onClose, children, onConfirm, onCancel, buttons = true, showButtonClose = false }){
    if (!isOpen) return null;

    return(
        <div className={styles.overlay}>
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
            >
                {showButtonClose && <button className={styles.closeButton} onClick={onClose}>
                    ×
                </button>}
                <div>
                    {children}
                </div>
                {buttons &&
                    <div className={styles.buttons}>
                        <button className={styles.butonPrimary} onClick={onConfirm}>Sim</button>
                        <button className={styles.butonSecundary} onClick={onCancel}>Não</button>
                    </div>
                }
            </div>
        </div>
    )
}