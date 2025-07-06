import './styles/theme.css';
import './styles/global.css';

import './language/i18nify';

import { TileMapProvider } from "./contexts/TileMapContext";

import { useEffect, useState } from 'react';
import { Configuration } from './components/Configurations';
import { ViewLayers } from './components/ViewLayers';
import { Menu } from './components/Menu';
import { View3D } from './components/View3D';


import { Attributes } from './components/Attributes';
import { Banners } from './components/Banners';

import { ChangeTexture } from './components/ChangeTexture';

import { HotKeys } from 'react-hotkeys';

import { useCallback } from 'react';

import {useTranslation} from 'react-i18next';
import { useSpeech } from './hook/useSpeech';
import { TilemapCanvas } from './components/TilemapCanvas';
import { initializeTileData } from './utils/tileService';

import { Category } from './components/Category';
import { Undo } from './components/Undo';
import { LayerList } from './components/LayerList';

export function App() {
    /*
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
    */

    return (
        <TileMapProvider>
        {/* <HotKeys keyMap={keyMap} handlers={handlers}> */}
            <TilemapCanvas/>
            <Category/>
            <Menu/>
            <LayerList/>
            <Attributes/>
            <Banners/>
            <ViewLayers/>
            {/* <View3D/> */}
            <Configuration/>
            <Undo/>
        {/* </HotKeys> */}
        </TileMapProvider>
    );
}