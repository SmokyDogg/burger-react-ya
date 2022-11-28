import styles from './forgot-password.module.css'
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react"
import {Link, Redirect, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { forgotPswUser } from '../../services/actions/user';
import { useSelector } from 'react-redux';

export const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user);
    const forgotSuccess = useSelector(store => store.user.forgotPswSuccess);
    const onChange = e => {
        setEmail(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPswUser(email));
    }
    const location = useLocation();
    if(forgotSuccess){
        return (
            <Redirect to={{
                pathname: '/reset-password',
                state: { from: location.pathname }
            }}
            />
        )
    }
    if(location.state?.from !== '/login' || user){
        return (
            <Redirect to={'/'}/>
        )
    }
    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <Input
                        placeholder="Укажите e-mail"
                        name="email"
                        type="email"
                        onChange={onChange}
                        value={email}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <Button disabled={!(email)} htmlType="submit" type="primary" size="medium">Восстановить</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <Link to='/login' className={`${styles.link}`}>Войти</Link></p>
        </div>
    )
}