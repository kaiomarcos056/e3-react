import styles from './Layer.module.css'

import React, { useState } from 'react';

import { useTileMap } from '../../contexts/TileMapContext';

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { BiSolidLeftArrow } from "react-icons/bi";
import { BiSolidDownArrow } from "react-icons/bi";

import { FaTrash } from "react-icons/fa6";

import { IoLockOpen } from "react-icons/io5";

export function Layer(){
    const { tilemap, setTilemap, setSelectedLayerSprite, stageRef } = useTileMap();
      
    const [openLayers, setOpenLayers] = useState({});
    const [openSubLayers, setOpenSubLayers] = useState({});

  
    const toggleLayer = (layerId) => {
        setOpenLayers(prev => ({ ...prev, [layerId]: !prev[layerId] }));
    };
    
    const toggleSubLayer = (layerId, spriteName) => {
        const key = `${layerId}-${spriteName}`;
        setOpenSubLayers(prev => ({ ...prev, [key]: !prev[key] }));
    };


    const toggleVisibleLayer = (layerId) => {
      setTilemap(prevTilemap => {
        return {
          ...prevTilemap,
          layers: prevTilemap.layers.map(layer => {
            if (layer.id !== layerId) return layer;

            // Verifica se há pelo menos um sprite visível
            const anyVisible = layer.sprites.some(sprite => sprite.visible);

            return {
              ...layer,
              // visible: !anyVisible,
              sprites: layer.sprites.map(sprite => ({
                ...sprite,
                visible: !anyVisible, // inverte: se tinha algum visível, desliga tudo; se todos estavam off, liga tudo
              }))
            };
          })
        };
      });

      console.log(JSON.stringify(tilemap))
    };

    const toggleVisibleTileGroup = (layerId, name) => {
  setTilemap(prevTilemap => ({
    ...prevTilemap,
    layers: prevTilemap.layers.map(layer => {
      if (layer.id !== layerId) return layer;

      // Verifica se há algum sprite visível com o mesmo nome
      const anyVisibleWithName = layer.sprites.some(
        sprite => sprite.name === name && sprite.visible
      );

      const updatedSprites = layer.sprites.map(sprite =>
        sprite.name === name
          ? { ...sprite, visible: !anyVisibleWithName }
          : sprite
      );

      const anyVisible = updatedSprites.some(sprite => sprite.visible);

      return {
        ...layer,
        // visible: anyVisible,
        sprites: updatedSprites
      };
    })
  }));
};

    const handleDeleteGroup = (layerId, name) => {
      setTilemap(prev => ({
        ...prev,
        layers: prev.layers.map(layer => {
          if (layer.id === layerId) {
            return {
              ...layer,
              sprites: layer.sprites.filter(sprite => sprite.name !== name),
            };
          }
          return layer;
        }),
      }));
    }

    const isGroupVisible = (layerId, name) => {
      const layer = tilemap.layers.find(l => l.id === layerId);
      if (!layer) return false;

      const groupSprites = layer.sprites.filter(sprite => sprite.name === name);
      return groupSprites.some(sprite => sprite.visible); // true se algum estiver visível
    };

    const isLayerVisible = (layerId) => {
      const layer = tilemap.layers.find(l => l.id === layerId);
      if (!layer) return false;

      return layer.sprites.some(sprite => sprite.visible);
    };


    const toggleVisibleTile = (x, y, layerId) => {
        console.log(`X = ${x} - Y = ${y} - LAYERID = ${layerId}`)
        console.log(JSON.stringify(tilemap))

        setTilemap(prevTilemap => ({
    ...prevTilemap,
    layers: prevTilemap.layers.map(layer => {
      if (layer.id !== layerId) return layer;

      const updatedSprites = layer.sprites.map(sprite => {
        if (sprite.x === x && sprite.y === y) {
          return {
            ...sprite,
            visible: !sprite.visible
          };
        }
        return sprite;
      });

      // Atualiza a visibilidade da layer com base nos sprites
      const anyVisible = updatedSprites.some(sprite => sprite.visible);

      return {
        ...layer,
        // visible: anyVisible,
        sprites: updatedSprites
      };
    })
  }));
    }

    const removeTile = (x, y, layerId) => {
  setTilemap(prevTilemap => ({
    ...prevTilemap,
    layers: prevTilemap.layers.map(layer => {
      if (layer.id !== layerId) return layer;

      const updatedSprites = layer.sprites.filter(
        sprite => !(sprite.x === x && sprite.y === y)
      );

      //const anyVisible = updatedSprites.some(sprite => sprite.visible);

      return {
        ...layer,
        //visible: anyVisible,
        sprites: updatedSprites
      };
    })
  }));
};

const handleSpriteClick = (sprite, layerId) => {
  setSelectedLayerSprite({ ...sprite, category: layerId });
};

    return (
        <ul className={styles.layerList}>
        {tilemap.layers.map(layer => (
        <li key={layer.id}>
            <div className={`${styles.layerItem} ${openLayers[layer.id] ? styles.activated : styles.deactivate}`}>
                
                <div onClick={() => toggleLayer(layer.id)} className={ `${styles.layerName}` }>
                  {layer.name}
                </div>

                <div className={styles.layerBotoes}>
                    <button className={styles.layerBotao} onClick={() => toggleVisibleLayer(layer.id)}>
                      { isLayerVisible(layer.id) ? <IoMdEye /> : <IoMdEyeOff />}
                    </button>
                    <button className={styles.layerBotao} onClick={() => toggleLayer(layer.id)}>
                        <IoLockOpen />
                    </button>
                    <button className={styles.layerBotao} onClick={() => toggleLayer(layer.id)}>
                        {openLayers[layer.id] ? <BiSolidDownArrow /> : <BiSolidLeftArrow />} 
                    </button>
                </div>

            </div>
          

          {openLayers[layer.id] && layer.sprites.length > 0 && (
            <ul className={styles.sublayerList}>
              {Object.entries(
                layer.sprites.reduce((acc, sprite) => {
                  if (!acc[sprite.name]) acc[sprite.name] = [];
                  acc[sprite.name].push(sprite);
                  return acc;
                }, {})
              ).map(([name, sprites]) => {
                const subKey = `${layer.id}-${name}`;
                return (
                  <li key={subKey}>
                    
                    <div className={`${styles.subLayer} ${openSubLayers[subKey] ? styles.subactivated : styles.subdeactivate}`} >
                        
                        <div className={styles.subLayerName} onClick={() => toggleSubLayer(layer.id, name)}>
                          <label> {name} </label>
                          <label> x{sprites.length} </label>
                        </div>

                        <div className={styles.subLayerButtons}>
                          <button 
                            className={styles.subLayerButton}
                            onClick={ () => toggleVisibleTileGroup(layer.id, name)}
                          > 
                            { isGroupVisible(layer.id, name) ? <IoMdEye /> : <IoMdEyeOff />} 
                          </button>
                          
                          <button 
                            className={styles.subLayerButton}
                            onClick={() => handleDeleteGroup(layer.id, name)}
                          > 
                            <FaTrash /> 
                          </button>

                          <button 
                            className={styles.subLayerButton} 
                            onClick={() => toggleSubLayer(layer.id, name)}
                          > 
                            {openSubLayers[subKey] ? <BiSolidDownArrow /> : <BiSolidLeftArrow />} 
                          </button>
                          
                        </div>
                    </div>

                    {openSubLayers[subKey] && (
                        <div className={styles.subLayerItem}>
                            {sprites.map((sprite, index) => (
                                <div className={styles.subLayerTile}>
                                  {/* <div className={styles.subLayerTileName} onClick={ () => setSelectedLayerSprite({...sprite, category:layer.id})}> */}
                                  <div className={styles.subLayerTileName} onClick={ () => handleSpriteClick(sprite, layer.id) }>
                                    <label>
                                      {sprite.name}
                                    </label>
                                    <label>
                                      {sprite.x}x{sprite.y}
                                    </label>
                                  </div>
                                  <div>
                                    <button className={styles.subLayerTileButtons} onClick={() => toggleVisibleTile(sprite.x,sprite.y,layer.id)} >  
                                      { sprite.visible ? <IoMdEye /> : <IoMdEyeOff />} 
                                    </button>
                                    <button className={styles.subLayerTileButtons} onClick={() => removeTile(sprite.x,sprite.y,layer.id)}>  <FaTrash /> </button>
                                  </div>
                                </div>
                            ))}
                        </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      ))}

      </ul>
    )
}