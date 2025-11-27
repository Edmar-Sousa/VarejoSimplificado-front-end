import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';


import { TextInputComponent } from '../components/TextInputComponent';
import { PasswordInputComponent } from '../components/PasswordInputComponent';
import { ButtonComponent } from '../components/ButtonComponent';


import styles from '../styles/login.module.css'
import LoginImageSVG from '../assets/login-image.svg'
import { useCallback } from 'react';


const loginFormScheme = yup.object({
    email: yup.string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    
    password: yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('A senha é obrigatória'),
});


export const LoginPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginFormScheme)
    });


    const onSubmit = useCallback((data: any) => {
        console.log(data);
    }, []);


    return (
        <div className={styles.loginContainer}>
            <div className={styles.imageContainer}>
                <img 
                    src={LoginImageSVG} 
                    className={styles.imageLogin}
                    alt='' />

                <h1 className={styles.titleLogin}>
                    Todas as informações que você <br /> 
                    precisa em um so lugar
                </h1>

            </div>

            <div className={styles.formContainer}>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)} >
                    <h2 className={styles.formTitle}>
                        Faça Login
                    </h2>

                    <TextInputComponent
                        id='user-name'
                        type='email'
                        label='Email'
                        placeholder='exemplo@gmail.com'
                        isError={!!errors.email}
                        errorMessage={errors.email?.message}
                        register={register('email')} />

                    <PasswordInputComponent 
                        id='user-password'
                        placeholder='**********'
                        label='Senha'
                        register={register('password')}
                        isError={!!errors.password}
                        errorMessage={errors.email?.message} />

                    <ButtonComponent 
                        text='Entrar' 
                        type='submit'
                        className={styles.buttonLogin} />
                </form>
            </div>
        </div>
    );
}
