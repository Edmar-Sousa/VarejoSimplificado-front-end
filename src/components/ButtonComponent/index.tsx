
import styles from './styles.module.css'

interface ButtonComponentProps {
    text: string
    type: 'button' | 'submit'
    className?: string
}

export const ButtonComponent = (props: ButtonComponentProps) => {

    const {
        text, 
        type,
        className,
    } = props;

    return (
        <button type={type} className={`${ styles.button } ${ className }`}>
            {text}
        </button>
    );

}
