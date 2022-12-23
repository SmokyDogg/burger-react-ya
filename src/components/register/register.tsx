import styles from './register.module.css';
import { FC, FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/hooks/useSelector&Dispatch';
import { Link, Redirect} from 'react-router-dom';
import { Input, PasswordInput, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import { registerUser } from '../../services/actions/user';
import { useForm } from '../../services/hooks/useForm';

export const Register: FC = () => {
    const {values, handleChange} = useForm({
        name: '',
        email: '',
        password: ''
    });
    const user = useSelector(store => store.user.user);
    const dispatch = useDispatch();
    const handleSubmit =(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(registerUser(values.email, values.password, values.name))
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
                        onChange={handleChange}
                        value={values.name}
                        error={false}
                        errorText="Что-то пошло не так"
                        size='default'/>
                </div>
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
                    <PasswordInput onChange={handleChange} value={values.password} name={'password'} />
                </div>
                <Button disabled={!(values.email && values.password)} htmlType="submit" type='primary' size="medium">Зарегистрироваться</Button>
            </form>
            <p className={`text text_type_main-default text_color_inactive mt-20`}>Уже зарегистрировались? <Link to='/login' className={`${styles.link}`}>Войти</Link></p>
        </div>
    )
}