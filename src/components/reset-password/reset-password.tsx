import styles from './reset-password.module.css'
import { Button, PasswordInput, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC, FormEvent } from "react"
import {Link, Redirect, useLocation} from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks/useSelector&Dispatch';
import { resetPswUser } from '../../services/actions/user';
import { useForm } from '../../services/hooks/useForm';
import { TLocation } from '../../services/types/data';

export const ResetPassword: FC = () => {
    const {values, handleChange} = useForm({
        password: '',
        token: ''
    })
    const dispatch = useDispatch();
    const resetSuccess = useSelector(store => store.user.resetPswSuccess);
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(resetPswUser(values.password, values.token))
    }
    const location = useLocation<TLocation>();
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
                    <PasswordInput  placeholder="Введите новый пароль" onChange={handleChange} value={values.password} name={'password'} />
                </div>
                <div className={`${styles.input} mt-6 mb-6`}>
                    <Input
                        placeholder="Введите код из письма"
                        name="token"
                        type="text"
                        onChange={handleChange}
                        value={values.token}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <Button disabled={!(values.token && values.password)} type="primary" htmlType='submit' size="medium">Сохранить</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Вспомнили пароль? <Link to='/login' className={`${styles.link}`}>Войти</Link></p>
        </div>
    )
}