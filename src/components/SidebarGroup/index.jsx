import { Atributos } from "../Atributos";
import { Banner } from "../Banner";
import { Topbar } from "../Topbar";
import { ViewLayers } from "../ViewLayers";

import { FaEye, FaQuestion, FaSlidersH } from 'react-icons/fa';

import { useState } from 'react';
import { useTileMap } from "../../contexts/TileMapContext";
import { useEffect } from 'react';

export function SidebarGroup(){
    const banners = [
        { id: 1, img: "controles.jpg", titulo: "controls" },
        { id: 2, img: "tutoriais.jpg", titulo: "tutorials" },
        { id: 3, img: "sobre.jpg", titulo: "about" },
    ];

    const [margin, setMargin] = useState({atributos: 0, ajuda: 0, exibir: 0})

    const { sidebarGroupOpen, setSidebarGroupOpen, setSettingsOpen } = useTileMap();
    const handleToggle = (id) => {
        if (sidebarGroupOpen === id) {
            setSidebarGroupOpen(null);
            //updateMargins(null);
        } 
        else {
            setSidebarGroupOpen(id);
            //updateMargins(id);
        }
        setSettingsOpen(false);
    };

    // function updateMargins(id) {
    //     setMargin(prev => {
    //         if (id === 'exibir') {
    //             return { atributos: 250, ajuda: 250, exibir: 0 };
    //         } 
    //         else if (id === 'ajuda') {
    //             return { atributos: 250, ajuda: 0, exibir: 0 };
    //         } 
    //         else if (id === 'atributos') {
    //             return { atributos: 0, ajuda: 0, exibir: 0 };
    //         } 
    //         else {
    //             return { atributos: 0, ajuda: 0, exibir: 0 };
    //         }
    //     });
    // }

    useEffect(() => {
        setMargin(prev => {
            if (sidebarGroupOpen === 'exibir') {
                return { atributos: 250, ajuda: 250, exibir: 0 };
            } else if (sidebarGroupOpen === 'ajuda') {
                return { atributos: 250, ajuda: 0, exibir: 0 };
            } else if (sidebarGroupOpen === 'atributos') {
                return { atributos: 0, ajuda: 0, exibir: 0 };
            } else {
                return { atributos: 0, ajuda: 0, exibir: 0 };
            }
        });
    }, [sidebarGroupOpen]);


    return(
        <div>
            <Topbar 
                titulo="attributes"
                icone={<FaSlidersH/>} 
                estilo={{ bottom: '210px' }}
                isActive={sidebarGroupOpen === 'atributos'}
                onToggle={() => handleToggle('atributos')}
                margin={margin.atributos}
            >
                <Atributos/>
            </Topbar>

            <Topbar 
                titulo="help" 
                icone={<FaQuestion/>} 
                estilo={{ bottom: '130px' }}
                isActive={sidebarGroupOpen === 'ajuda'}
                onToggle={() => handleToggle('ajuda')}
                margin={margin.ajuda}
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    {banners.map( banner => (
                        <Banner img={banner.img} titulo={banner.titulo}/>
                    ))}
                </div>
            </Topbar>

            <Topbar 
                titulo="show" 
                icone={<FaEye/>} 
                estilo={{ bottom: '50px' }}
                isActive={sidebarGroupOpen === 'exibir'}
                onToggle={() => handleToggle('exibir')}
                margin={margin.exibir}
            >
                <ViewLayers/>
            </Topbar>
        </div>
    )
}