import { useTileMap } from "../../contexts/TileMapContext"

export function Heading(){

    const {selectedSprite, selectedLayerSprite} = useTileMap()

    return(
        <div style={ {position: 'absolute', width: '100%', textAlign: 'center'} }>
            <h1>{JSON.stringify(selectedSprite)}</h1>
            <br />
            {/* <h1>{JSON.stringify(selectedLayerSprite)}</h1> */}
        </div>
    )
}