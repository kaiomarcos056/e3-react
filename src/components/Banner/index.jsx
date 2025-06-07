import styles from './Banner.module.css'

export function Banner({img,titulo}){
    return(
        <div 
            className={styles.banner} 
            style={{ 
                background: `url(/banners/${img})`,
                backgroundPosition: 'center center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className={styles.bannerContent}>
                <h4>{titulo}</h4>
            </div>
        </div>
    )
}