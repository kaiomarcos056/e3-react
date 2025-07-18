import './styles/theme.css';
import './styles/global.css';

import './language/i18nify';

import { TileMapProvider } from "./contexts/TileMapContext";
import { Configuration } from './components/Configurations';
import { ViewLayers } from './components/ViewLayers';
import { Menu } from './components/Menu';
import { Attributes } from './components/Attributes';
import { Banners } from './components/Banners';
import { TilemapCanvas } from './components/TilemapCanvas';
import { Category } from './components/Category';
import { Undo } from './components/Undo';
import { LayerList } from './components/LayerList';
import { View3D } from './components/View3D';

export function App() {

    return (
        <TileMapProvider>
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
        </TileMapProvider>
    );
}