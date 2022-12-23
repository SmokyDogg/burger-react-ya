import styles from './nav-profile.module.css';
import { NavLink } from 'react-router-dom';
import { useDispatch } from '../../services/hooks/useSelector&Dispatch';
import { exit } from '../../services/actions/user';
import { deleteCookie } from '../../utils/cookie';
import { FC } from 'react'

const NavProfile: FC = () => {
    const dispatch = useDispatch();
    const onExit = () => {
        dispatch(exit());
        deleteCookie('authToken');
        deleteCookie('refreshToken');
    }
    return (
        <nav className={`${styles.navigation}`}>
            <NavLink exact to='/profile' activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>Профиль</NavLink>
            <NavLink exact to='/profile/orders' activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>История заказов</NavLink>
            <NavLink exact to={{ pathname: '/login', state: { from: '/profile' } }} onClick={onExit} activeClassName={`${styles.activeLink}`} className={`${styles.link} text text_type_main-medium `}>Выход</NavLink>
            <p className={`${styles.caption} text text_type_main-default mt-20`}>В этом разделе вы можете изменить свои персональные данные</p>
        </nav>
    )
}

export default NavProfile