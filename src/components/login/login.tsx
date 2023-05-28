import styles from './login.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, FormEvent} from "react"
import {Link, Redirect, useLocation} from 'react-router-dom';
import { authUser } from '../../services/actions/user';
import { useSelector, useDispatch } from '../../services/hooks/useSelector&Dispatch';
import {useForm} from '../../services/hooks/useForm'
import { TLocation } from '../../services/types/data';

export const Login: FC= () => {
    const {values, handleChange} = useForm({
        email: '',
        password: ''
    })
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user);
    const exitRequest = useSelector(store => store.user.exitRequest);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(authUser(values.email, values.password))
    }
    const location = useLocation<TLocation>();
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
                        onChange={handleChange}
                        value={values.email}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <PasswordInput name={'password'} onChange={handleChange} value={values.password}/>
                </div>
                <Button disabled={!(values.email && values.password)} htmlType='submit' type="primary" size="medium">Войти</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20 mb-4`}>Вы — новый пользователь? <Link to='/register' className={`${styles.link}`}>Зарегистрироваться</Link></p>
            <p className={`text text_type_main-default text_color_inactive`}>Забыли пароль? <Link to={{ pathname: "/forgot-password", state: { from: location.pathname } }} className={`${styles.link}`}>Восстановить пароль</Link></p>
        </div>
    )
}