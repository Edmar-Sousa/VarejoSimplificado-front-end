import * as yup from 'yup';
import { useCallback, useState } from 'react';
import axios from 'axios'

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuthStore } from '../../states/auth';

import { TextInputComponent } from '../../components/TextInputComponent';
import { PasswordInputComponent } from '../../components/PasswordInputComponent';
import { ButtonComponent } from '../../components/ButtonComponent';
import { loginUser } from '../../services/auth';


import styles from './styles.module.css'
import LoginImageSVG from '../../assets/login-image.svg'


const loginFormScheme = yup.object({
    email: yup.string()
        .email('Email inválido')
        .required('O email é obrigatório'),
    
    password: yup.string()
        .min(6, 'A senha deve ter no mínimo 6 caracteres')
        .required('A senha é obrigatória'),
});

interface LoginFormType {
    email: string;
    password: string;
}

export const LoginPage = () => {
    const navigate = useNavigate();
    const setAccessToken = useAuthStore((state) => state.setAccessToken);

    
    const [isLoadding, setIsLoadding] = useState(false);


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginFormScheme)
    });


    const onSubmit = useCallback(async (data: LoginFormType) => {
        setIsLoadding(true);
        
        try {
            const response = await loginUser(data.email, data.password);
            setAccessToken(response.access_token);

            toast.success('Login realizado com sucesso!');
            navigate('/dashboard');
        } 

        catch (error) {

            const message = axios.isAxiosError(error) 
                ? toast.error(error.response?.data.detail) 
                : 'Erro ao realizar login. Tente novamente mais tarde.';

            toast.error(message);
        }

        finally {
            setIsLoadding(false);
        }
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
                        errorMessage={errors.password?.message} />

                    <ButtonComponent 
                        text='Entrar' 
                        type='submit'
                        className={styles.buttonLogin}
                        isLoadding={isLoadding} />
                </form>
            </div>
        </div>
    );
}
