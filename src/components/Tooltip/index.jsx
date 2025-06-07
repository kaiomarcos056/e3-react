import styles from './Tooltip.module.css';

export function Tooltip({nome}){
    return(
        <span className={styles.tooltip}>
            {nome}
        </span>
    )
}