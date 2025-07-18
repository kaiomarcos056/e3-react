import styles from './SidebarBody.module.css'

export function SidebarBody({
    children,
    borderTopLeftRadius = 0,
    borderTopRightRadius = 0,
    borderBottomRightRadius = 0,
    borderBottomLeftRadius = 0,
    vertical='bottom'
}){
    return(
        <div 
            className={styles.container}
            style={{ 
                borderRadius: `
                ${borderTopLeftRadius}px 
                ${borderTopRightRadius}px 
                ${borderBottomRightRadius}px 
                ${borderBottomLeftRadius}px
                `,
                padding: `10px 10px 10px 10px`
            }}
        >
            {children}
        </div>
    )
}