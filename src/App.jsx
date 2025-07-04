import TileMapEditor from './TileMapEditor';

import './styles/theme.css';
import './styles/global.css';

import { LuClipboardList } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";

import { useState, useRef, useEffect } from 'react';

import { Layer } from './components/Layer';
import { ContainerButtons } from './components/ContainerButtons'
import { Sidebar } from './components/Sidebar';
import { Settings } from './components/Settings';
import { TileMapProvider } from './contexts/TileMapContext';
import { Topbar } from './components/Topbar';
import { ViewLayers } from './components/ViewLayers';
import { Menu } from './components/Menu';
import { History } from './components/History';
import { View3D } from './components/View3D';

import { Heading } from './components/Heading';

import './language/i18nify';
import { Atributos } from './components/Atributos';
import { Banner } from './components/Banner';

import { FaEye, FaQuestion, FaSlidersH } from 'react-icons/fa';

import { SidebarGroup } from './components/SidebarGroup';
import { Modal } from './components/Modal';

import { ChangeTexture } from './components/ChangeTexture';

import { HotKeys } from 'react-hotkeys';

import { useCallback } from 'react';

import {useTranslation} from 'react-i18next';
import { useSpeech } from './hook/useSpeech';
import { TilemapCanvas } from './components/TilemapCanvas';
import { Tooltip } from './components/Tooltip';
import { initializeTileData } from './utils/tileService';

export function App() {
    const [error, setError] = useState(null);

    const [isInitialized, setIsInitialized] = useState(false);
    
    useEffect(() => {
        initializeTileData()
        // Se a inicialização for bem-sucedida, atualiza o estado 'isInitialized' para 'true'.
        .then(() => setIsInitialized(true))
        // Se ocorrer um erro, atualiza o estado de erro.
        .catch(setError);
    }, []);

    const { speak } = useSpeech();

    const {t} = useTranslation();

    const [activeCard, setActiveCard] = useState(null);

    const keyMap = {
        SAVE: 'ctrl+s',
        HELP: 'ctrl+h',
        PISO: 'q',
        PAREDE: 'w',
        PORTAS: 'e',
        MOVEIS: 'r',
        ELETRODOMESTICOS: 't',
        UTENSILIOS: 'y',
        INTERATIVOS: 'u',
        PERSON: 'i'
    };

    const handlers = {
        PISO: () => {
            //speak(t("floor"));
            setActiveCard(prev => prev === 1 ? null : 1);
        },
        PAREDE: () => {
            //speak(t("wall"));
            setActiveCard(prev => prev === 2 ? null : 2);
        },
        PORTAS: () => {
            //speak(t("door"));
            setActiveCard(prev => prev === 3 ? null : 3);
        },
        MOVEIS: () => {
            //speak(t("furniture"));
            setActiveCard(prev => prev === 4 ? null : 4);
        },
        ELETRODOMESTICOS: () => {
            //speak(t("appliances"));
            setActiveCard(prev => prev === 5 ? null : 5);
        },
        UTENSILIOS: () => {
            //speak(t("utensils"));
            setActiveCard(prev => prev === 6 ? null : 6);
        },
        INTERATIVOS: () => {
            //speak(t("interactive"));
            setActiveCard(prev => prev === 7 ? null : 7);
        },
        PERSON: () => {
            //speak(t("person"));
            setActiveCard(prev => prev === 8 ? null : 8);
        },
    };


    // CONTROLE DOS SIDEBAR
    const [marginCardSideBar, setMarginCardSideBar] = useState(0);
    const [activeSidebar, setActiveSidebar] = useState(null);
    const handleActiveSideBar = (id) => {
        setMarginCardSideBar(id === 'menu' && id !== activeSidebar ? 130 : 0);
        setActiveSidebar(activeSidebar === id ? null : id)
    }

    return (
        // <View3D  />

        <TileMapProvider>
            <HotKeys keyMap={keyMap} handlers={handlers}>
            {/* <Heading/> */}
            {/* <Layer></Layer> */}
            {/* <TileMapEditor /> */}
            {/* <Tooltip/> */}
            <TilemapCanvas/>

            <View3D/>

            <Sidebar 
                titulo="Menu" 
                estilo={{ top: '35px' }} 
                icon={<IoMenu />}
                isOpen={activeSidebar === 'menu'}
                onToggle={() => handleActiveSideBar('menu')}
            >
                <Menu/>
            </Sidebar>

            <Sidebar 
                titulo="Elementos" 
                estilo={{ top: '115px' }} 
                icon={<LuClipboardList />}
                isOpen={activeSidebar === 'elementos'}
                onToggle={() => handleActiveSideBar('elementos')}
                styleCard={{marginLeft: marginCardSideBar+'px'}}
            >
                <Layer/>
            </Sidebar>

            <Settings/>

            <History/>

            <ContainerButtons activeCard={activeCard} setActiveCard={setActiveCard} />

            <SidebarGroup/>

            
            </HotKeys>
        </TileMapProvider>
    );
}