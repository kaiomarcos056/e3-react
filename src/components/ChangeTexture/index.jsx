import styles from './ChangeTexture.module.css'

import { useState } from "react"
import { Modal } from "../Modal"

import { spritesMap } from '../../SpritesMap';

import { FaArrowRight } from "react-icons/fa";

export function ChangeTexture({isOpen = false, handleOpen}){

    const [isModalTexture, setModalTexture] = useState(false);

    const [layerId, setLayerId] = useState(null);

    const selectedLayer = spritesMap.find(sprite => sprite.category === layerId);

    const [selectedSprite, setSelectedSprite] = useState(null)

    function handleSpriteChange(e) {
        const spriteName = e.target.value;
        console.log(spriteName)
        const spriteObj = selectedLayer?.sprites.find(s => s.name === spriteName);
        setSelectedSprite(spriteObj);
    }

    const [imagePreview, setImagePreview] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleConfirm = () => {
        const layer = localStorage.getItem(layerId);
        
        if (!layer) {
            const tile = { name: selectedSprite.name, path: imagePreview}
            localStorage.setItem(layerId, JSON.stringify([tile]));
        }
        else{
            const layermap = JSON.parse(layer);
            
            let exists = false;

            const updatedLayermap = layermap.map(item => {
                if (item.name === selectedSprite.name) {
                    exists = true;
                    return { ...item, path: imagePreview };
                }
                return item;
            })

            if (!exists) updatedLayermap.push({ name: selectedSprite.name, path: imagePreview });
            

            localStorage.setItem(layerId, JSON.stringify(updatedLayermap));
        }
        handleOpen()
    }

    return(
        <Modal isOpen={isOpen} onConfirm={handleConfirm} onCancel={handleOpen}>
            
            <form action="">
                <label htmlFor="" className={styles.labelSelect}>Selecione a camada do sprite:</label> <br/>
                <select name="" id="" onChange={(e) => setLayerId(e.target.value)} className={styles.selectTile}>
                    <option value="">Selecione...</option>
                    {spritesMap.map( sprite => (
                        <option key={sprite.id} value={sprite.category}>{sprite.name}</option>
                    ))}
                </select><br/>

                <label htmlFor="" className={styles.labelSelect}>Selecione o sprite:</label><br/>
                <select name="" id=""  onChange={handleSpriteChange} className={styles.selectTile}>
                    <option value="">Selecione...</option>
                    {selectedLayer?.sprites.map( sprite => (
                        <option key={sprite.name} value={sprite.name}>{sprite.name}</option>
                    ))}
                </select><br/>
            </form>
            <br/>          
            <div className={styles.previewContainer}>
                <div className={styles.previewItem}>
                    {selectedSprite?.path && (
                        <img src={selectedSprite.path} alt={selectedSprite.name || 'sprite'} className={styles.previewImg} />
                    )}
                </div>
                <FaArrowRight />
                <label className={`${styles.previewItem} ${styles.previewItemImg}`} htmlFor='imgpreview'>
                    <input type="file" accept="image/*" onChange={handleFileChange} id='imgpreview'  style={{display: 'none'}}/>
                    {imagePreview && <img 
                        src={imagePreview} 
                        alt={selectedSprite?.name || ''} 
                        className={styles.previewImg} /> }
                </label>
            </div>
            <br/>
        </Modal>
    )
}