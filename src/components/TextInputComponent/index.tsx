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
            <button type='button' className={styles.buttonIcon} onClick={onClick}>
                <Icon />
            </button> 
        }
        </>
    );
}


interface TextInputComponentProps {
    id: string
    label: string
    type: 'text' | 'password' | 'email'

    placeholder?: string
    icon?: LucideIcon


    onClickIcon?: () => void
}


export const TextInputComponent = (props: TextInputComponentProps) => {

    const {
        id, 
        label,
        type,
        placeholder,
        icon,
        onClickIcon,
    } = props

    return (
        <div className={ styles.inputContainer }>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>

            <div className={styles.fieldContainer}>
                <input 
                    type={type} 
                    id={id} 
                    className={styles.input} 
                    placeholder={placeholder} />

                <ButtonIcon Icon={icon} onClick={onClickIcon} />
            </div>
        </div>
    );
}
