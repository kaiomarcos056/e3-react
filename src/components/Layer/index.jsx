import styles from './Layer.module.css';
import React, { useState } from 'react';
import { useTileMap } from '../../contexts/TileMapContext';
import { useTranslation } from 'react-i18next';

import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import { BiSolidLeftArrow, BiSolidDownArrow } from 'react-icons/bi';
import { FaTrash } from 'react-icons/fa6';
import { IoLockOpen } from 'react-icons/io5';

export function Layer() {
  const { t } = useTranslation();
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
    setTilemap(prevTilemap => ({
      ...prevTilemap,
      layers: prevTilemap.layers.map(layer => {
        if (layer.id !== layerId) return layer;
        const anyVisible = layer.sprites.some(sprite => sprite.visible);
        return {
          ...layer,
          sprites: layer.sprites.map(sprite => ({
            ...sprite,
            visible: !anyVisible
          }))
        };
      })
    }));
  };

  const toggleVisibleTileGroup = (layerId, name) => {
    setTilemap(prevTilemap => ({
      ...prevTilemap,
      layers: prevTilemap.layers.map(layer => {
        if (layer.id !== layerId) return layer;

        const anyVisibleWithName = layer.sprites.some(
          sprite => sprite.name === name && sprite.visible
        );

        const updatedSprites = layer.sprites.map(sprite =>
          sprite.name === name
            ? { ...sprite, visible: !anyVisibleWithName }
            : sprite
        );

        return {
          ...layer,
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
            sprites: layer.sprites.filter(sprite => sprite.name !== name)
          };
        }
        return layer;
      })
    }));
  };

  const isGroupVisible = (layerId, name) => {
    const layer = tilemap.layers.find(l => l.id === layerId);
    if (!layer) return false;
    return layer.sprites
      .filter(sprite => sprite.name === name)
      .some(sprite => sprite.visible);
  };

  const isLayerVisible = (layerId) => {
    const layer = tilemap.layers.find(l => l.id === layerId);
    return layer?.sprites.some(sprite => sprite.visible);
  };

  const toggleVisibleTile = (x, y, layerId) => {
    setTilemap(prevTilemap => ({
      ...prevTilemap,
      layers: prevTilemap.layers.map(layer => {
        if (layer.id !== layerId) return layer;

        const updatedSprites = layer.sprites.map(sprite =>
          sprite.x === x && sprite.y === y
            ? { ...sprite, visible: !sprite.visible }
            : sprite
        );

        return {
          ...layer,
          sprites: updatedSprites
        };
      })
    }));
  };

  const removeTile = (x, y, layerId) => {
    setTilemap(prevTilemap => ({
      ...prevTilemap,
      layers: prevTilemap.layers.map(layer => {
        if (layer.id !== layerId) return layer;
        const updatedSprites = layer.sprites.filter(
          sprite => !(sprite.x === x && sprite.y === y)
        );
        return {
          ...layer,
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
      {tilemap.layers.filter(layer => layer.sprites.length > 0).map(layer => (
        <li key={layer.id}>
          <div
            className={`${styles.layerItem} ${
              openLayers[layer.id] ? styles.activated : styles.deactivate
            }`}
          >
            <div 
              onClick={() => toggleLayer(layer.id)} 
              className={styles.layerName}
              tabIndex={0}
              aria-label="layer"
            >
              {t(layer.id)}
            </div>

            <div className={styles.layerBotoes}>
              <button 
                className={styles.layerBotao} 
                onClick={() => toggleVisibleLayer(layer.id)}
                aria-label="visualizar"
              >
                {isLayerVisible(layer.id) ? <IoMdEye /> : <IoMdEyeOff />}
              </button>
              <button 
                className={styles.layerBotao} 
                onClick={() => toggleLayer(layer.id)}
                aria-label="Trancar"
              >
                <IoLockOpen />
              </button>
              <button 
                className={styles.layerBotao} 
                onClick={() => toggleLayer(layer.id)}
                aria-label="Expandir layer"
              >
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
                    <div
                      className={`${styles.subLayer} ${
                        openSubLayers[subKey] ? styles.subactivated : styles.subdeactivate
                      }`}
                    >
                      <div
                        className={styles.subLayerName}
                        onClick={() => toggleSubLayer(layer.id, name)}
                        tabIndex={0}
                      >
                        <label>{t(sprites[0].translate)}</label>
                        <label>x{sprites.length}</label>
                      </div>

                      <div className={styles.subLayerButtons}>
                        <button
                          className={styles.subLayerButton}
                          onClick={() => toggleVisibleTileGroup(layer.id, name)}
                          aria-label="Visualizar"
                        >
                          {isGroupVisible(layer.id, name) ? <IoMdEye /> : <IoMdEyeOff />}
                        </button>
                        <button
                          className={styles.subLayerButton}
                          onClick={() => handleDeleteGroup(layer.id, name)}
                          aria-label="Deletar grupo de layer"
                        >
                          <FaTrash />
                        </button>
                        <button
                          className={styles.subLayerButton}
                          onClick={() => toggleSubLayer(layer.id, name)}
                          aria-label="Expandir grupo de layer"
                        >
                          {openSubLayers[subKey] ? <BiSolidDownArrow /> : <BiSolidLeftArrow />}
                        </button>
                      </div>
                    </div>

                    {openSubLayers[subKey] && (
                      <div className={styles.subLayerItem}>
                        {sprites.map((sprite, index) => (
                          <div key={index} className={styles.subLayerTile}>
                            <div
                              className={styles.subLayerTileName}
                              onClick={() => handleSpriteClick(sprite, layer.id)}
                              tabIndex={0}
                            >
                              <label>{t(sprite.translate)}</label>
                              <label>
                                {sprite.x}x{sprite.y}
                              </label>
                            </div>
                            <div>
                              <button
                                className={styles.subLayerTileButtons}
                                onClick={() => toggleVisibleTile(sprite.x, sprite.y, layer.id)}
                                aria-label="visualizar tile"
                              >
                                {sprite.visible ? <IoMdEye /> : <IoMdEyeOff />}
                              </button>
                              <button
                                className={styles.subLayerTileButtons}
                                onClick={() => removeTile(sprite.x, sprite.y, layer.id)}
                                aria-label="Deletar tile"
                              >
                                <FaTrash />
                              </button>
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
  );
}
