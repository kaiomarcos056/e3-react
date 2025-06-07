import styles from './View3D.module.css'

import { useState } from 'react';

import { LuMove3D, LuAxis3D } from "react-icons/lu";
import { TbHexagon3D } from "react-icons/tb";
import { Modal } from '../Modal';

export function View3D(){

    const [isModal3d, setModal3d] = useState(false);

    return(
        <>
        
        <Modal isOpen={isModal3d} buttons={false} onClose={() => setModal3d(false)} showButtonClose={true}>
            <div className={styles.container}></div>
        </Modal>
        <div className={styles.card} onClick={() => setModal3d(true)}>
            {/* <img src="/3d.svg" alt="" className={styles.icone}/> */}
            <LuAxis3D  className={styles.iconee} />
        </div>
        </>
    )
}