import styles from './SidebarHeader.module.css'

export function SidebarHeader({title}){
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                {title}
            </h1>
        </div>
    )
}