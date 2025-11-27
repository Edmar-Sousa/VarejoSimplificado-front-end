import type { LucideIcon } from 'lucide-react'

import styles from './styles.module.css'


type ButtonIconProps = {
    Icon?: LucideIcon;
    onClick?: () => void;
}

const ButtonIcon = ({ Icon, onClick }: ButtonIconProps) => {
    return (
        <>
        { Icon && 
            <button type='button' className={styles.buttonIcon} onClick={onClick} aria-label='Button icon'>
                <Icon />
            </button> 
        }
        </>
    );
}

interface ErrorMessageProps {
    errorMessage?: string;
    isError?: boolean;
}

const ErrorMessage = ({ isError, errorMessage }: ErrorMessageProps) => {
    return (
        <>
        { isError &&
            <small className={styles.errorMessage}>
                {errorMessage}
            </small>
        }
        </>
    );
}

interface TextInputComponentProps {
    type: 'text' | 'password' | 'email'
    id: string
    label: string
    register: any;
    placeholder?: string
    
    icon?: LucideIcon
    errorMessage?: string;
    isError?: boolean;

    onClickIcon?: () => void
}


export const TextInputComponent = (props: TextInputComponentProps) => {

    const {
        id, 
        label,
        type,
        placeholder,
        icon,
        isError,
        errorMessage,
        register,
        onClickIcon,
    } = props

    return (
        <div className={ `${styles.inputContainer} ${isError ? styles.inputError : ''}` }>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>

            <div className={styles.fieldContainer}>
                <input 
                    {...register}
                    type={type} 
                    id={id} 
                    className={styles.input} 
                    placeholder={placeholder} />

                <ButtonIcon Icon={icon} onClick={onClickIcon} />
            </div>

            <ErrorMessage isError={isError} errorMessage={errorMessage} />
        </div>
    );
}
