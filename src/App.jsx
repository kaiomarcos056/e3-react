import TileMapEditor from './TileMapEditor';

import './styles/theme.css';
import './styles/global.css';

import { LuClipboardList } from "react-icons/lu";
import { IoMenu } from "react-icons/io5";
import { LuMenu } from "react-icons/lu";


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

import React, { useState } from 'react';
import { ChangeTexture } from './components/ChangeTexture';

export function App() {
    
    

    return (
        <TileMapProvider>
            <Heading/>
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

            <ContainerButtons/>
        </TileMapProvider>
    );
}