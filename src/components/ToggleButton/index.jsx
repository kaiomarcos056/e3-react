import { useId } from 'react';

import styles from './ToggleButton.module.css'
import { useTranslation } from 'react-i18next';

export function ToggleButton( { ativo = false, onChange } ){

    const id = useId();

    const {t} = useTranslation();

    return(
        <div className={styles.buttonContainer}>
            <input 
                type="checkbox" 
                id={id} 
                className={styles.toggleButton} 
                checked={ativo}
                onChange={(e) => onChange?.(e.target.checked)}
            />
            
            <label htmlFor={id} className={styles.toggleButtonLabel}></label>

            <label className={styles.toggleTitle}> { ativo ? `${t("on")}` : `${t("off")}` } </label>
        </div>
    )

}