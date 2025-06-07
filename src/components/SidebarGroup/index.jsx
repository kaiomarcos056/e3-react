import { Atributos } from "../Atributos";
import { Banner } from "../Banner";
import { Topbar } from "../Topbar";
import { ViewLayers } from "../ViewLayers";

import { FaEye, FaQuestion, FaSlidersH } from 'react-icons/fa';

import { useState } from 'react';

export function SidebarGroup(){
    const banners = [
        { id: 1, img: "controles.jpg", titulo: "Controles" },
        { id: 2, img: "tutoriais.jpg", titulo: "Tutoriais" },
        { id: 3, img: "sobre.jpg", titulo: "Sobre" },
    ];

    const [margin, setMargin] = useState({atributos: 0 , ajuda: 0 , exibir: 0 })

    const [activeSidebar, setActiveSidebar] = useState(null);
    const handleToggle = (id) => {
        if (activeSidebar === id) {
            setActiveSidebar(null);
            updateMargins(null);
        } 
        else {
            setActiveSidebar(id);
            updateMargins(id);
        }
    };

    function updateMargins(id) {
        setMargin(prev => {
            if (id === 'exibir') {
                return { atributos: 250, ajuda: 250, exibir: 0 };
            } 
            else if (id === 'ajuda') {
                return { atributos: 250, ajuda: 0, exibir: 0 };
            } 
            else if (id === 'atributos') {
                return { atributos: 0, ajuda: 0, exibir: 0 };
            } 
            else {
                return { atributos: 0, ajuda: 0, exibir: 0 };
            }
        });
    }


    return(
        <div>
            <Topbar 
                titulo="Atributos" 
                icone={<FaSlidersH/>} 
                estilo={{ bottom: '210px' }}
                isActive={activeSidebar === 'atributos'}
                onToggle={() => handleToggle('atributos')}
                margin={margin.atributos}
            >
                <Atributos/>
            </Topbar>

            <Topbar 
                titulo="Ajuda" 
                icone={<FaQuestion/>} 
                estilo={{ bottom: '130px' }}
                isActive={activeSidebar === 'ajuda'}
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
                titulo="Exibir" 
                icone={<FaEye/>} 
                estilo={{ bottom: '50px' }}
                isActive={activeSidebar === 'exibir'}
                onToggle={() => handleToggle('exibir')}
                margin={margin.exibir}
            >
                <ViewLayers/>
            </Topbar>
        </div>
    )
}