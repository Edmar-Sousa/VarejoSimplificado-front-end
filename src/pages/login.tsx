import { TextInputComponent } from '../components/TextInputComponent';
import { PasswordInputComponent } from '../components/PasswordInputComponent';
import { ButtonComponent } from '../components/ButtonComponent';


import styles from '../styles/login.module.css'
import LoginImageSVG from '../assets/login-image.svg'



export const LoginPage = () => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.imageContainer}>
                <img 
                    src={LoginImageSVG} 
                    className={styles.imageLogin} />

                <h1 className={styles.titleLogin}>
                    Todas as informações que você <br /> 
                    precisa em um so lugar
                </h1>

            </div>

            <div className={styles.formContainer}>
                <form className={styles.form}>
                    <h2 className={styles.formTitle}>
                        Faça Login
                    </h2>

                    <TextInputComponent
                        id='user-name'
                        type='email'
                        label='Email'
                        placeholder='exemplo@gmail.com' />

                    <PasswordInputComponent 
                        id='user-password'
                        placeholder='**********'
                        label='Senha' />

                    <ButtonComponent 
                        text='Entrar' 
                        type='button'
                        className={styles.buttonLogin} />
                </form>
            </div>
        </div>
    );
}
