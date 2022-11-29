import styles from './login.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState } from "react"
import {Link, Redirect, useLocation} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authUser } from '../../services/actions/user';
import { useSelector } from 'react-redux';

export const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const onChangeInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setState({
            ...state,
            [name]: value
        });
    }
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user);
    const exitRequest = useSelector(store => store.user.exitRequest);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(authUser(state.email, state.password))
    }
    const location = useLocation();
    if(user && !exitRequest) {
        return (
            <Redirect to={location.state?.from || '/'}/>
        );
    }
    return (
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title} text text_type_main-medium`}>Вход</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.input} mt-6`}>
                    <Input
                        placeholder="Email"
                        name="email"
                        type="email"
                        onChange={onChangeInputs}
                        value={state.email}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <PasswordInput type={'password'} onChange={onChangeInputs} value={state.password} name={'password'} />
                </div>
                <Button disabled={!(state.email && state.password)} htmlType='submit' type="primary" size="medium">Войти</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20 mb-4`}>Вы — новый пользователь? <Link to='/register' className={`${styles.link}`}>Зарегистрироваться</Link></p>
            <p className={`text text_type_main-default text_color_inactive`}>Забыли пароль? <Link to={{ pathname: "/forgot-password", state: { from: location.pathname } }} className={`${styles.link}`}>Восстановить пароль</Link></p>
        </div>
    )
}