import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeft } from 'lucide-react';

import styles from './styles.module.css';

interface ButtonGoBackProps {
    text: string;
}
    
export const ButtonGoBack = (props: ButtonGoBackProps) => {
    const navigate = useNavigate();
    const { text } = props;

    const handleGoBack = useCallback(() => {
        navigate(-1);
    }, []);

    return (
        <button onClick={handleGoBack} className={styles.button}>
            <ChevronLeft size={16} />
            <p className={styles.text}>{text}</p>
        </button>
    );
}
