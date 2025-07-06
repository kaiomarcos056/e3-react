import styles from './Category.module.css'

import { CategoryContent } from "../CategoryContent";
import { CategoryList } from "../CategoryList";

export function Category(){
    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <CategoryContent/>
                <CategoryList/>
            </div>
        </div>
    )
}