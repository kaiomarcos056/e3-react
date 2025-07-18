import { useTileMap } from "../../contexts/TileMapContext"

export function COMPONENTEDETESTE(){

    const {selectedLayer, setSelectedLayer, selectedLayerSprite} = useTileMap();

    return(
        <div style={{position: 'absolute', top: 0, width: '100%', border: '1px solid red', textAlign: 'center'}}>
            {/* <h1>
                {JSON.stringify(selectedLayerSprite)}
            </h1>
             
            */}
            <h1>
                {JSON.stringify(selectedLayer)}
            </h1>
        </div>
    )
}