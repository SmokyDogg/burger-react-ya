import { Logo } from '@ya.praktikum/react-developer-burger-ui-components'
import { BurgerIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ListIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FC } from 'react'
import styles from './app-header.module.css'
import { TLocation } from '../../services/types/data';
const AppHeader: FC = () => {
    const location = useLocation<TLocation>();
    return (
    <header className={`${styles.header} pb-4 pt-4`}>
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <ul className={styles.list}>
                    <li className={`${styles.item} pl-5 pr-5`}>
                        <NavLink exact to='/' className={`${styles.link}`} activeClassName={`${styles.link_active}`}>
                            <BurgerIcon type={location.pathname === '/' ? "primary"  : "secondary" }/>
                            <p className="text text_type_main-default pl-2">Конструктор </p>
                        </NavLink>
                    </li>
                    <li className={`${styles.item} pl-5 pr-5 ml-2`}>
                        <NavLink to='/feed' className={`${styles.link}`} activeClassName={`${styles.link_active}`}>
                            <ListIcon type={location.pathname === '/feed' ? "primary"  : "secondary" } />
                            <p className="text text_type_main-default pl-2 ">Лента заказов</p>
                        </NavLink>
                    </li>
                </ul>
                <Link to='/'>
                    <Logo/>
                </Link>
            </div>
            <div className='pl-5 pr-5'>
                <NavLink to='/profile' className={`${styles.link}`} activeClassName={`${styles.link_active}`}>
                    <ProfileIcon type={location.pathname === '/profile' ? "primary"  : "secondary" } />
                    <p className="text text_type_main-default pl-2 ">Личный кабинет</p>
                </NavLink>
            </div>
        </nav>
    </header>
    );
}

export default AppHeader