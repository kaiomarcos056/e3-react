import { createContext, useContext, useState, useRef } from 'react';

const TileMapContext = createContext();

export function TileMapProvider({ children }) {

    const stageRef = useRef(null);

    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [selectedSprite, setSelectedSprite] = useState({})

    const [selectedLayerSprite, setSelectedLayerSprite] = useState({x: -1, y: -1})

    const [history, setHistory] = useState([])

    const [tilemap, setTilemap] = useState({
        width: 10,
        height: 10,
        tileSize: 32,
        spriteSheetPath: '',
        layers: [
            { id: 'floor', name: 'Pisos', visible: true, sprites: [] },
            { id: 'walls', name: 'Paredes', visible: true, sprites: [] },
            { id: 'door', name: 'Portas e Janelas', visible: true, sprites: [] },
            { id: 'furniture', name: 'Móveis', visible: true, sprites: [] },
            { id: 'utensils', name: 'Utensílios', visible: true, sprites: [] }
        ],
    });


    return (
        <TileMapContext.Provider value={
            { 
                stageRef,
                stageSize, setStageSize,
                selectedSprite, setSelectedSprite, 
                selectedLayerSprite, setSelectedLayerSprite,
                history, setHistory,
                tilemap, setTilemap
            }
        }>
            {children}
        </TileMapContext.Provider>
    )
}

export function useTileMap() {
    const context = useContext(TileMapContext);
    if (!context) {
        throw new Error('useTilemap deve ser usado dentro de TilemapProvider');
    }
    return context;
}