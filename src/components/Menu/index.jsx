import styles from './Menu.module.css'

import {useTranslation} from 'react-i18next';

import { FaPlus } from "react-icons/fa6";
import { IoMdSave } from "react-icons/io";
import { FaFolderOpen } from "react-icons/fa";
import { useTileMap } from '../../contexts/TileMapContext';
import { Modal } from '../Modal';

import { useState, useRef } from 'react';
import { adaptarAppJsonParaE3Map } from '../../utils/adaptador';
import { converterJsonParaXml } from '../../utils/converterJsonParaXml';
import { converterXmlParaJson } from '../../utils/converterXmlParaJson';
import { converterJsonParaJson } from '../../utils/converterJsonParaJson';
import { convertMap } from '../../utils/converter';

export function Menu(){

    const { tilemap, setTilemap, setSelectedSprite, setSelectedLayerSprite, setHistory, history } = useTileMap();

    const {t} = useTranslation();

    //const [isModalOpen, setModalOpen] = useState(false);

    const reset = () => {
        setSelectedSprite({})
        setSelectedLayerSprite({x: -1, y: -1})
        setHistory([])
        setTilemap({
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
        })
    }

    const download = () => {
        const jsonString = JSON.stringify(tilemap, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'tilemap.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // SALVAR
    const [isModalSave, setModalSave] = useState(false);
    const openModalSave = () => {
    
        // 1. ADAPTAR: Converte o JSON do seu editor para o formato E3Map.
        const e3Map = adaptarAppJsonParaE3Map(tilemap);
        console.log(JSON.stringify(e3Map));

        const a = convertMap(e3Map);
        //console.log(a);
       // console.log(JSON.stringify(tilemap))

        //setModalSave(true);

        //const xml = converterJsonParaXml(tilemap);
        //console.log(xml)



    }
    const saveJSON = () => {
        download();
        setModalSave(false);
    }
    const cancel = () => {
        setModalSave(false);
    }

    // NOVO
    const [isModalNew, setModalNew] = useState(false);
    const openModalNew = () => {
        if(history.length > 0){
            setModalNew(true)
        }
    }
    const saveNew = () => {
        download()
        reset()
        setModalNew(false)
    }
    const cancelNew = () => {
        reset()
        setModalNew(false)
    }

    // CARREGAR
    const fileInputRef = useRef(null);
        const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const fileName = file.name;
            const fileExtension = fileName.split('.').pop().toLowerCase();

            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;

                switch (fileExtension) {
                    case "json":
                        try {
                            const jsonContent = JSON.parse(content);
                            const retorno = converterJsonParaJson(jsonContent);
                            setTilemap(retorno)
                        } 
                        catch (err) {
                            console.error("Erro ao parsear JSON:", err);
                        }
                        break;

                    case "xml":
                        const retorno = converterXmlParaJson(content)

                        setTilemap(retorno)
                        
                        break;

                    default:
                        console.log("Extensão não suportada");
                        break;
                }
            };

            reader.readAsText(file);
        }
        event.target.value = null;
    };

    const handleKey = (e, action) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            action();
        }
    };

    return(
        <div 
            className={styles.menuContainer} 
            role="menubar" 
            aria-label={t("menu_main")}
        >
            <Modal 
                isOpen={isModalNew} 
                onConfirm={saveNew}
                onCancel={cancelNew}
            >
                <h2>{t("save_message")}</h2>
            </Modal>

            <Modal 
                isOpen={isModalSave} 
                onConfirm={saveJSON}
                onCancel={cancel}
            >
                <h2>{t("save_message")}</h2>
            </Modal>

            <div 
                className={styles.menuItem} 
                onClick={openModalNew}
                onKeyDown={(e) => handleKey(e, openModalNew)}
                role="menuitem"
                tabIndex={0}
                aria-label={t("new")}
            >
                <FaPlus className={styles.menuIcone} />
                <h3>{t("new")}</h3>
            </div>

            <div 
                className={styles.menuItem} 
                onClick={openModalSave}
                onKeyDown={(e) => handleKey(e, openModalSave)}
                role="menuitem"
                tabIndex={0}
                aria-label={t("save")}
            >
                <IoMdSave className={styles.menuIcone} />
                <h3>{t("save")}</h3>
            </div>

            <div 
                className={styles.menuItem} 
                tabIndex={0}
                aria-label={t("open")}
            >
                <label htmlFor="tile" style={ { display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' } }>
                    <FaFolderOpen className={styles.menuIcone} />
                    <h3>{t("open")}</h3>
                </label>
                
                <input 
                    type="file" 
                    accept=".json, .xml"
                    id="tile" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    style={{ display: "none" }}
                    aria-hidden="true"
                    tabIndex={-1}
                />
            </div>
        </div>
    )
}