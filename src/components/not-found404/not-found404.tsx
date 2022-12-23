import { FC } from 'react';
import styles from './not-found404.module.css';

export const NotFound404: FC = () => {
    return (
        <div className={styles.main}>
            <img src="../../images/svinka.png" alt="Свинья-404" />
        </div>
    )
}