import styles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useRef, useEffect, FormEvent, SyntheticEvent } from "react"
import { useSelector, useDispatch } from '../../services/hooks/useSelector&Dispatch';
import { updateUser, exit, getUser } from '../../services/actions/user';
import { deleteCookie } from '../../utils/cookie';
import NavProfile from '../nav-profile/nav-profile';
import {useForm} from '../../services/hooks/useForm'

export const Profile = () =>{
    const user = useSelector(store => store.user.user);
    const updateFailed = useSelector(store => store.user.updateFailed);
	const expiredToken = useSelector(store => store.user.expiredToken);
    const dispatch = useDispatch();
    const {values, handleChange, setValues} = useForm({
        name: '',
        email: '',
        password: '',
    });
    const nameRef = useRef<HTMLInputElement>(null);
    const passRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(()=>{
        dispatch(getUser());
    }, [dispatch]);

    useEffect(()=>{
		if(updateFailed && !expiredToken){
			dispatch(updateUser(values.name, values.email, values.password));
		}
	},[dispatch, expiredToken, updateFailed, values.name, values.email, values.password])

    useEffect(()=>{
        if(user){
            setValues({
                name: user.name,
                email: user.email,
                password: '',
            })
        }
    },[setValues, user])

    const nameClick  = () => {
        setTimeout(() => nameRef.current?.focus(), 0)
    }
    const emailClick = () => {
        setTimeout(() => emailRef.current?.focus(), 0)
    }
    const passwordClick = () => {
        setTimeout(() => passRef.current?.focus(), 0)
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(updateUser(values.name, values.email, values.password));
    }

    const handleReset = (e: SyntheticEvent<Element, Event>) =>{
        e.preventDefault();
        user && setValues({
            ...values,
            name: user.name,
            email: user.email,
            password: ''
        })
    }

    return (
        <div className={`${styles.container}`}>
            <NavProfile/>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.input}`}>
                    <Input
                        placeholder="Имя"
                        name="name"
                        type="text"
                        icon='EditIcon'
                        onChange={handleChange}
                        value={values.name}
                        ref={nameRef}
                        onIconClick={nameClick}
                        error={false}
                        errorText="Ошибка"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6`}>
                    <Input 
                        placeholder='Логин'
                        name='email'
                        type="email"
                        icon='EditIcon'
                        onChange={handleChange} 
                        value={values.email}
                        ref={emailRef}
                        onIconClick={emailClick}
                        error={false}
                        errorText="Ошибка"
                        size="default" 
                    />
                </div>
                <div className={`${styles.input} mt-6`}>
                    <Input 
                        placeholder='Пароль'
                        name='password'
                        type="password"
                        icon='EditIcon'
                        onChange={handleChange} 
                        value={values.password}
                        ref={passRef}
                        onIconClick={passwordClick}
                        error={false}
                        errorText="Ошибка"
                        size="default" 
                    />
                </div>
                <div className={`${styles.buttons}`}>
                    <Button type="secondary" size="medium" htmlType='reset' onClick={handleReset}>Отмена</Button>
                    <Button disabled={!(values.name && values.email && values.password)} htmlType="submit" type="primary" size="medium" >Сохранить</Button>
                </div>
            </form>
        </div>
    )
}