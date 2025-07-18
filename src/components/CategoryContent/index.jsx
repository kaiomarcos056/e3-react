import styles from './CategoryContent.module.css';

import { useTileMap } from "../../contexts/TileMapContext";
import { HiSpeakerWave } from 'react-icons/hi2';

import { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { spritesMap } from '../../SpritesMap';
import { Card } from '../Card';
import { useTranslation } from 'react-i18next';

export function CategoryContent() {

    const {t} = useTranslation();

    const [viewAllSprites, setViewAllSprites] = useState(false);
    const {
        selectedCategory, 
        selectedSprite, 
        setSelectedSprite
    } = useTileMap();

    const scrollRef = useRef(null);

    const handleScroll = (direction) => {
        if (scrollRef.current) {
            const left = direction === 'right' ? 100 : -100;
            scrollRef.current.scrollBy({ left: left, behavior: 'smooth' });
        }
    };

    const [spriteList, setSpriteList] = useState({});

    const audioRef = useRef(null);
    const handleAudio = (path) =>  {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        const audio = new Audio(path);
        audio.volume = 0.5;
        audio.play();
        audioRef.current = audio;
    }

    useEffect(() => {
        const category = spritesMap.find(sprite => sprite.category === selectedCategory);
        setSpriteList(category);
    }, [selectedCategory]);

    return(
        selectedCategory && (
        <div>
            <div className={styles.contentHeader}>
                <div className={styles.contentHeaderTitle}>
                    <h1 className={styles.title}>
                        {t(selectedCategory)}
                    </h1>
                    <div className={styles.titleFeedback}>
                        <HiSpeakerWave className={styles.titleFeedbackIcon}/>
                        <h4 className={styles.titleFeedbackInfo}>
                            {t('feedback_tile')}
                        </h4>
                    </div>
                </div>
                <h3 className={styles.viewAll} onClick={() => setViewAllSprites(prev => !prev)}>
                    { t(viewAllSprites ? "hide" : "show_all") }
                </h3>
            </div>

            <div className={styles.wrapper}>
                <button 
                    className={styles.arrowButton}
                    onClick={() => handleScroll('left')}
                    style={ { display: viewAllSprites ? 'none' : 'block' } }
                >
                    <FaChevronLeft/>
                </button>

                <div
                    className={`${styles.gradientBorder} ${styles.contentBody}`}
                    style={ { flexWrap: viewAllSprites ? 'wrap' : 'nowrap' } }
                    ref={scrollRef}
                    role='listbox'
                    aria-label='sprites'
                >
                    {spriteList?.sprites?.map((s, i) => (
                        <Card
                            info={t(s.translate)} 
                            role={"option"}
                            active={selectedSprite.name === s.name}
                            onClick={() => {
                                handleAudio(s.soundPath);
                                setSelectedSprite({ ...s, category: selectedCategory });
                            }}
                        >
                            <img key={i} src={s.path} style={ { width: 32, height: 32, objectFit: 'contain' } } />
                        </Card>
                    ))}
                </div>

                <button 
                    className={styles.arrowButton} 
                    onClick={() => handleScroll('right')}
                    style={ { display: viewAllSprites ? 'none' : 'block' } }
                >
                    <FaChevronRight/>
                </button>
            </div>
        </div>
        )
    )
}