import styles from './register.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link, Redirect} from 'react-router-dom';
import {  Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../services/actions/user';

export const Register = () => {
    const [state, setState] = useState({
        name: '',
        email: '',
        password: ''
    });
    const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const onChangeInputs = (e) => {
        const value = e.target.value;
        const name = e.target.name;
        setState({
            ...state,
            [name]: value,
        });
    }
    const handleSubmit =(e) => {
        e.preventDefault();
        dispatch(registerUser(state.email, state.password, state.name))
    }
    if(user){
        return(
            <Redirect to={'/'}/>
        )
    }
    return(
        <div className={`${styles.container}`}>
            <h1 className={`${styles.title} text text_type_main-medium`}>Регистрация</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.input} mt-6`}>
                    <Input
                        placeholder="Имя"
                        name='name'
                        type='text'
                        onChange={onChangeInputs}
                        value={state.name}
                        error={false}
                        errorText="Что-то пошло не так"
                        size='default'/>
                </div>
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
                <Button disabled={!(state.email && state.password)} htmlType="submit" type='primary' size="medium">Зарегистрироваться</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Уже зарегистрировались? <Link to='/login' className={`${styles.link}`}>Войти</Link></p>
        </div>
    )
}