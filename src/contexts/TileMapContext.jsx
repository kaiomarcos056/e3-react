import { 
    createContext, 
    useContext, 
    useState 
} from 'react';

const TileMapContext = createContext();

export function TileMapProvider({ children }) {
    const [
        isMenuOpen, 
        setIsMenuOpen
    ] = useState(false);

    const [
        isElementsOpen, 
        setIsElementsOpen
    ] = useState(false);

    const [
        isAttributesOpen, 
        setIsAttributesOpen
    ] = useState(false);

    const [
        isHelpOpen, 
        setIsHelpOpen
    ] = useState(false);

    const [
        isDisplayOpen, 
        setIsDisplayOpen
    ] = useState(false);

    const [
        displacementSidebarMenu, 
        setDisplacementSidebarMenu
    ] = useState(0);

    const [
        displacementSidebarHelp, 
        setDisplacementSidebarHelp
    ] = useState(0);

    const [
        displacementSidebarDisplay, 
        setDisplacementSidebarDisplay
    ] = useState(0);

    const [
        selectedCategory, 
        setSelectedCategory
    ] = useState(null);

    const [
        selectedSprite, 
        setSelectedSprite
    ] = useState({});

    const [
        selectedLayerSprite, 
        setSelectedLayerSprite
    ] = useState(null);

    const [
        selectedLayer, 
        setSelectedLayer
    ] = useState(null);

    const [
        history, 
        setHistory
    ] = useState([]);

    const [
        settingsOpen, 
        setSettingsOpen
    ] = useState(false);

    const [
        hoverCell, 
        setHoverCell
    ] = useState(null);

    const [
        tilemap, 
        setTilemap
    ] = useState({
        width: 5,
        height: 5,
        tileSize: 32,
        spriteSheetPath: '',
        layers: [
            { 
                id: 'floor', 
                name: 'Pisos', 
                visible: true, 
                sprites: [] 
            },
            { 
                id: 'walls', 
                name: 'Paredes', 
                visible: true, 
                sprites: [] 
            },
            { 
                id: 'door_and_windows', 
                name: 'Portas e Janelas', 
                visible: true, 
                sprites: [] 
            },
            { 
                id: 'furniture', 
                name: 'Móveis',
                visible: true, 
                sprites: [] 
            },
            { 
                id: 'utensils', 
                name: 'Utensílios', 
                visible: true, 
                sprites: [] 
            },
            { 
                id: 'eletronics', 
                name: 'Eletrodomésticos', 
                visible: true, 
                sprites: [] 
            },
            { 
                id: 'interactive_elements', 
                name: 'Elementos Interativos', 
                visible: true, 
                sprites: [] 
            },
            { 
                id: 'persons', 
                name: 'Pessoa', 
                visible: true, 
                sprites: [] 
            },
        ],
    });

    return (
        <TileMapContext.Provider value = {
            {
                isMenuOpen, 
                setIsMenuOpen,
                isElementsOpen, 
                setIsElementsOpen,
                isAttributesOpen, 
                setIsAttributesOpen,
                isHelpOpen, 
                setIsHelpOpen,
                isDisplayOpen, 
                setIsDisplayOpen,
                displacementSidebarMenu, 
                setDisplacementSidebarMenu,
                displacementSidebarDisplay, 
                setDisplacementSidebarDisplay,
                displacementSidebarHelp, 
                setDisplacementSidebarHelp,
                selectedCategory, 
                setSelectedCategory,
                selectedSprite, 
                setSelectedSprite,
                selectedLayer, 
                setSelectedLayer,
                selectedLayerSprite, 
                setSelectedLayerSprite,
                settingsOpen, 
                setSettingsOpen,
                hoverCell, 
                setHoverCell,
                history, 
                setHistory,
                tilemap, 
                setTilemap,
            }
        }>
            {children}
        </TileMapContext.Provider>
    )
}

export function useTileMap() {
    const context = useContext(TileMapContext);
    if (!context) {
        throw new Error(`
            useTilemap deve ser usado dentro de TilemapProvider
        `);
    }
    return context;
}