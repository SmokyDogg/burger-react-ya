import styles from './profile.module.css';
import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components'
import { useState, useRef, useEffect } from "react"
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateUser, exit, getUser } from '../../services/actions/user';
import { deleteCookie } from '../../utils/cookie';
import NavProfile from '../nav-profile/nav-profile';

export const Profile = () =>{
    const user = useSelector(store => store.user.user);
    const updateFailed = useSelector(store => store.user.updateFailed);
	const expiredToken = useSelector(store => store.user.expiredToken);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        name: user.name,
        email: user.email,
        password: '',
    });
    const nameRef = useRef(null);
    const passRef = useRef(null);
    const emailRef = useRef(null);

    useEffect(()=>{
        dispatch(getUser());
    }, [dispatch]);

    useEffect(()=>{
		if(updateFailed && !expiredToken){
			dispatch(updateUser(state.name,state.email,state.password));
		}
	},[dispatch, expiredToken, updateFailed, state.name,state.email,state.password])

    const nameClick  = () => {
        setTimeout(() => nameRef.current.focus(), 0)
    }
    const emailClick = () => {
        setTimeout(() => emailRef.current.focus(), 0)
    }
    const passwordClick = () => {
        setTimeout(() => passRef.current.focus(), 0)
    }
    const onChangeInputs = e => {
        const value = e.target.value;
        const name = e.target.name;

        setState({
        ...state,
        [name]: value,
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(state.name,state.email,state.password));
    }

    const handleReset = (e) =>{
        e.preventDefault();
        setState({
            ...state,
            name: user.name,
            email: user.email,
            password: ''
        })
    }

    const handleExit = (e) =>{
        dispatch(exit());
        deleteCookie('authToken');
        deleteCookie('refreshToken');
    }
    return (
        <div className={`${styles.container}`}>
            <NavProfile/>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.input}`}>
                    <Input
                        placeholder="??????"
                        name="name"
                        type="text"
                        icon='EditIcon'
                        onChange={onChangeInputs}
                        value={state.name}
                        ref={nameRef}
                        onIconClick={nameClick}
                        error={false}
                        errorText="????????????"
                        size="default"
                    />
                </div>
                <div className={`${styles.input} mt-6`}>
                    <Input 
                        placeholder='??????????'
                        name='email'
                        type="email"
                        icon='EditIcon'
                        onChange={onChangeInputs} 
                        value={state.email}
                        ref={emailRef}
                        onIconClick={emailClick}
                        error={false}
                        errorText="????????????"
                        size="default" 
                    />
                </div>
                <div className={`${styles.input} mt-6`}>
                    <Input 
                        placeholder='????????????'
                        name='password'
                        type="password"
                        icon='EditIcon'
                        onChange={onChangeInputs} 
                        value={state.password}
                        ref={passRef}
                        onIconClick={passwordClick}
                        error={false}
                        errorText="????????????"
                        size="default" 
                    />
                </div>
                <div className={`${styles.buttons}`}>
                    <Button type="secondary" size="medium" htmlType='button' onClick={handleReset}>????????????</Button>
                    <Button disabled={!(state.name && state.email && state.password)} htmlType="submit" type="primary" size="medium" >??????????????????</Button>
                </div>
            </form>
        </div>
    )
}