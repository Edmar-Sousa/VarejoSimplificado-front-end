
import styles from './styles.module.css'


const SpinnerLoadding = () => {
    return (
        <div className={styles.spinnerLoadding}></div>
    );
}


interface ButtonComponentProps {
    text: string;
    type: 'button' | 'submit';
    className?: string;
    isLoadding?: boolean;
}

export const ButtonComponent = (props: ButtonComponentProps) => {

    const {
        text, 
        type,
        className,
        isLoadding,
    } = props;

    return (
        <button 
            type={type} 
            className={`${ styles.button } ${ className }`}
            disabled={isLoadding}>
                { isLoadding ? <SpinnerLoadding /> : text }
        </button>
    );

}
