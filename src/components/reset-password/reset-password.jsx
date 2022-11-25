import styles from './reset-password.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react"
import {Link, Redirect, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetPswUser } from '../../services/actions/user';
import { useSelector } from 'react-redux';

export const ResetPassword = () => {
    const [state, setState] = ({
        password: '',
        token: ''
    })
    const dispatch = useDispatch();
    const resetSuccess = useSelector(store => store.user.resetPswSuccess);
    const onChangeInputs = e => {
        const value = e.target.value;
        const name = e.target.name;
        setState ({
            ...state,
            [name]: value
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPswUser(state.password, state.token))
    }
    const location = useLocation();
    if(location.state?.from !== '/forgot-password'){
        return(
            <Redirect to={'/'}/>
        )
    }
    if(resetSuccess){
        return (
            <Redirect to={'/login'}/>
        )
    }
    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title} text text_type_main-medium`}>Восстановление пароля</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.input} mt-6`}>
                    <PasswordInput  placeholder="Введите новый пароль" type={'password'} onChange={onChangeInputs} value={state.password} name={'password'} />
                </div>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <Input
                        placeholder="Введите код из письма"
                        name="token"
                        type="text"
                        onChange={onChangeInputs}
                        value={state.token}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <Button disabled={!(state.token && state.password)} type="primary" size="medium">Сохранить</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <Link to='/login' className={`${styles.link}`}>Войти</Link></p>
        </div>
    )
}