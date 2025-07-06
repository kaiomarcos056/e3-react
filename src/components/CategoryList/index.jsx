import styles from './CategoryList.module.css';

import { spritesMap } from '../../SpritesMap';

import { Button } from '../Button';

import { LuBrickWall, LuDoorOpen, LuGuitar, LuLampFloor } from 'react-icons/lu';
import { TbManFilled } from 'react-icons/tb';
import { IoHandRightOutline } from 'react-icons/io5';
import { CgSmartHomeRefrigerator } from 'react-icons/cg';
import { MdTableRestaurant } from 'react-icons/md';
import { useTileMap } from '../../contexts/TileMapContext';
import { useTranslation } from 'react-i18next';

const icons = {
    floor: <LuLampFloor/>,
    walls: <LuBrickWall/>,
    door_and_windows: <LuDoorOpen/>,
    furniture: <MdTableRestaurant/>,
    eletronics: <CgSmartHomeRefrigerator/>,
    utensils: <LuGuitar/>,
    interactive_elements: <IoHandRightOutline/>,
    persons: <TbManFilled/>,
}

export function CategoryList(){
    const {t} = useTranslation();

    const {selectedCategory, setSelectedCategory} = useTileMap();

    const handleSelectedCategory = (category) => {
        setSelectedCategory(category === selectedCategory ? null : category);
    }

    return (
        <div
            role='listbox'
            aria-label={t('sprite_category')}
            className={styles.container}
        >
            {spritesMap.map((s, i) => (
                <Button
                    key={s.category}
                    info={t(s.category)}
                    borderTopLeftRadius={15}
                    borderTopRightRadius={15}
                    borderBottomRightRadius={15}
                    borderBottomLeftRadius={15}
                    active={s.category == selectedCategory}
                    ariaSelected={s.category == selectedCategory}
                    onClick={() => handleSelectedCategory(s.category)}
                >
                    {icons[s.category]}
                </Button>
            ))}
        </div>
    )
}