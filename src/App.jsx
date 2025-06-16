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

export function App() {
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
        UTENSILIOS: 'y'
    };

    const handlers = {
        PISO: () => {
            speak(t("floor"));
            setActiveCard(prev => prev === 1 ? null : 1);
        },
        PAREDE: () => {
            speak(t("wall"));
            setActiveCard(prev => prev === 2 ? null : 2);
        },
        PORTAS: () => {
            speak(t("door"));
            setActiveCard(prev => prev === 3 ? null : 3);
        },
        MOVEIS: () => {
            speak(t("furniture"));
            setActiveCard(prev => prev === 4 ? null : 4);
        },
        ELETRODOMESTICOS: () => {
            setActiveCard(prev => prev === 5 ? null : 5);
        },
        UTENSILIOS: () => {
            setActiveCard(prev => prev === 6 ? null : 6);
        },
    };

    

    return (
        <TileMapProvider>
            <HotKeys keyMap={keyMap} handlers={handlers}>
            {/* <Heading/> */}
            {/* <Layer></Layer> */}
            <History/>

            <View3D/>
            <Settings/>

            <Sidebar titulo="Menu" estilo={{ top: '5%' }} icon={<IoMenu />}>
                <Menu/>
            </Sidebar>

            <Sidebar titulo="Elementos" estilo={{ top: '35%' }} icon={<LuClipboardList />}>
                <Layer/>
            </Sidebar>

            <SidebarGroup/>

            <TileMapEditor />

            <ContainerButtons activeCard={activeCard} setActiveCard={setActiveCard} />
            </HotKeys>
        </TileMapProvider>
    );
}