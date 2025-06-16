import { useState, useRef, useEffect } from 'react';
import styles from './ContainerButtons.module.css';

import { LuBrickWall, LuDoorOpen, LuGuitar, LuLampFloor } from "react-icons/lu";
import { MdTableRestaurant } from "react-icons/md";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { IoHandRightOutline } from "react-icons/io5";
import { TbManFilled } from "react-icons/tb";
import { HiSpeakerWave } from "react-icons/hi2";
import { FaChevronRight, FaChevronLeft  } from "react-icons/fa";

import { useTileMap } from '../../contexts/TileMapContext';
import { spritesMap } from '../../SpritesMap';
import { useSpeech } from '../../hook/useSpeech';
import { useTranslation } from 'react-i18next';


const icons = [
    { id: 1, name: 'floor', icon: <LuLampFloor /> },
    { id: 2, name: 'wall', icon: <LuBrickWall /> },
    { id: 3, name: 'door', icon: <LuDoorOpen /> },
    { id: 4, name: 'furniture', icon: <MdTableRestaurant /> },
    { id: 5, name: 'appliances', icon: <CgSmartHomeRefrigerator /> },
    { id: 6, name: 'utensils', icon: <LuGuitar /> },
    { id: 7, name: 'hand', icon: <IoHandRightOutline /> },
    { id: 8, name: 'toy', icon: <TbManFilled /> },
];

export function ContainerButtons({ activeCard, setActiveCard }) {

    const { speak } = useSpeech();
    const {t} = useTranslation();

    const { selectedSprite, setSelectedSprite } = useTileMap();

    const [viewAllSprites, setViewAllSprites] = useState(false);

    const containerRef = useRef(null);

    const scrollRef = useRef(null);
    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
        }
    };
    

    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, text: '' });

    const handleMouseMove = (e, name) => {
        console.log(e.clientX)
        setTooltip({
            visible: true,
            x: e.clientX,
            y: e.clientY,
            text: name
        });
    };
    const handleMouseLeave = () => {
        setTooltip({ visible: false, x: 0, y: 0, text: '' });
    };


    return (
        <>
        <div className={styles.container} ref={containerRef}>
            
            {spritesMap.map(s => (
                s.id === activeCard 
                ? (
                    <div key={s.id} className={`${activeCard ? styles.show : ''}`}>

                        <div className={styles.HeaderBar}>
                            <div className={styles.headerTitle}>
                                {/* <h1 key={s.id} className={styles.tiltleCategory}> {s.name} </h1> */}
                                <h1 key={s.id} className={styles.tiltleCategory}> {t(s.category)} </h1>
                                <div className={styles.titleFeedback}>
                                    <HiSpeakerWave className={styles.feedbackicon}/>
                                    {/* <h4 className={styles.feedbacktitle}>FEEDBACK COM O SOM DO TILE AO CLICAR</h4> */}
                                    <h4 className={styles.feedbacktitle}>{t("feedback_tile")}</h4>
                                </div>
                            </div>
                            <h3 className={styles.viewAll} onClick={() => setViewAllSprites(prev => !prev)}>
                                {/* {viewAllSprites ? 'Ocultar' : 'Mostrar tudo'} */}
                                {viewAllSprites ? t("hide") : t("show_all")}
                            </h3>
                        </div>

                        <div className={styles.carouselWrapper}>
                            <button className={styles.arrowButton} onClick={scrollLeft} style={ { display: viewAllSprites ? 'none' : 'block' } }>
                                <FaChevronLeft />
                            </button>

                            <div className={`${styles.containerSprites} ${styles.gradientBorder} ${activeCard ? styles.show : ''}`} style={ { flexWrap: viewAllSprites ? 'wrap' : 'nowrap' } } ref={scrollRef}>
                                {s?.sprites?.map((s, i) => (
                                    <div 
                                        className={`${styles.cardSprite} ${selectedSprite.name === s.name ? styles.cardSpriteActive : styles.cardSpriteInactive}`}
                                        onMouseMove={(e) => handleMouseMove(e, s.translate)}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => {
                                            //const audio = new Audio(s.soundPath);
                                            //audio.volume = 0.1; // VALOR ENTRE 0.0 (MUDO) e 1.0 (VOLUME MÁXIMO)
                                            //audio.play();
                                            speak(t(`${s.translate}`));
                                            setSelectedSprite({ ...s, category: spritesMap[activeCard - 1]?.category });
                                        }}
                                        style={ { cursor: 'pointer', } }
                                    >
                                        <img 
                                            key={i} 
                                            src={s.path} 
                                            style={ { width: 32, height: 32 } }
                                            // onClick={() => setSelectedSprite({...s, category: spritesMap[activeCard-1]?.category }) }
                                        />
                                    </div>
                                ))}
                            </div>
                            
                            <button className={styles.arrowButton} onClick={scrollRight} style={ { display: viewAllSprites ? 'none' : 'block' } }>
                                <FaChevronRight />
                            </button>
                        </div>
                    </div>
                ) 
                : null
            ))}

            <div className={styles.content}>
                {icons.map(({ id, name, icon }) => (
                    <div
                        key={id}
                        className={
                            `
                            ${styles.card} 
                            ${activeCard === null ? '' : activeCard === id ? styles.active : styles.inactive}
                            `
                        }
                        onClick={() => {
                            speak(t(`${name}`));
                            setActiveCard(prev => prev === id ? null : id)
                        }}
                    >
                        {icon}
                    </div>
                ))}
            </div>
        </div>

        {tooltip.visible && (
            <div
                className={styles.tooltipFloating}
                style={{ top: tooltip.y+10, left: tooltip.x+10 }}
            >
                {/* {tooltip.text} */}
                {t(tooltip.text)}
            </div>
        )}
        </>
    );
}
