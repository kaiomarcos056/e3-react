import { FaQuestion } from 'react-icons/fa6';
import { useTileMap } from '../../contexts/TileMapContext';
import { Sidebar } from '../Sidebar';
import styles from './Banners.module.css'

import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

const banners = [
    { id: 1, img: "controles.jpg", titulo: "controls" },
    { id: 2, img: "tutoriais.jpg", titulo: "tutorials" },
    { id: 3, img: "sobre.jpg", titulo: "about" },
];

export function Banners(){

    const {t} = useTranslation();

    const {
        isHelpOpen, setIsHelpOpen, setDisplacementSidebarHelp,
        setIsDisplayOpen, displacementSidebarDisplay,
        setIsAttributesOpen, 
        setSettingsOpen
    } = useTileMap();

    const handleHelpOpen = () => {
        setIsHelpOpen(!isHelpOpen);
        setIsDisplayOpen(false);
        setIsAttributesOpen(false);
    }

    useEffect(() => {
        if(isHelpOpen) {
            setSettingsOpen(false);
        }
    }, [isHelpOpen])

    return(
        <Sidebar
            title={t('help')}
            icon={<FaQuestion/>}
            active={isHelpOpen}
            borderTopLeftRadiusButton={15}
            borderBottomLeftRadiusButton={15}
            borderTopLeftRadiusBody={15}
            positionBottom={106}
            horizontalAlignment="bottom"
            verticalAlignment="left"
            toggleSidebar={isHelpOpen}
            onClick={handleHelpOpen}
            setDisplacementSidebar={setDisplacementSidebarHelp}
            positionLeft={displacementSidebarDisplay}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {banners.map( banner => (
                    <div 
                        className={styles.banner} 
                        style={{
                            background: `url(/banners/${banner.img})`,
                            backgroundPosition: 'center center',
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            width: '250px'
                        }}
                        tabIndex={0}
                        aria-label={t(`${banner.titulo}`)}
                    >
                        <div className={styles.bannerContent}>
                            <h4 className={styles.title} >{t(`${banner.titulo}`)}</h4>
                        </div>
                    </div>
                ))}
            </div>
        </Sidebar>
    )
}