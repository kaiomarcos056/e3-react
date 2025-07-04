import { createContext, useContext, useState, useRef } from 'react';

const TileMapContext = createContext();

export function TileMapProvider({ children }) {

    const stageRef = useRef(null);

    const [stageSize, setStageSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    const [selectedSprite, setSelectedSprite] = useState({})
    const [selectedLayerSprite, setSelectedLayerSprite] = useState(null)
    const [history, setHistory] = useState([])
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [sidebarGroupOpen, setSidebarGroupOpen] = useState(false)
    const [hoverCell, setHoverCell] = useState(null)

    const [tilemap, setTilemap] = useState({
        width: 5,
        height: 5,
        tileSize: 32,
        spriteSheetPath: '',
        layers: [
            { id: 'floor', name: 'Pisos', visible: true, sprites: [] },
            { id: 'walls', name: 'Paredes', visible: true, sprites: [] },
            { id: 'door_and_windows', name: 'Portas e Janelas', visible: true, sprites: [] },
            { id: 'furniture', name: 'Móveis', visible: true, sprites: [] },
            { id: 'utensils', name: 'Utensílios', visible: true, sprites: [] },
            { id: 'eletronics', name: 'Eletrodomésticos', visible: true, sprites: [] },
            { id: 'interactive_elements', name: 'Elementos Interativos', visible: true, sprites: [] },
            { id: 'persons', name: 'Pessoa', visible: true, sprites: [] },
        ],
    });


    return (
        <TileMapContext.Provider value={
            { 
                stageRef,
                stageSize, setStageSize,
                selectedSprite, setSelectedSprite, 
                selectedLayerSprite, setSelectedLayerSprite,
                settingsOpen, setSettingsOpen,
                sidebarGroupOpen, setSidebarGroupOpen,
                hoverCell, setHoverCell,
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