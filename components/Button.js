import React from 'react';
import styles from '../styles/components/Button.module.scss'

const Button = ({ icon=null, onClick=() => {}, text, className }) => {
    return (
        <button onClick={onClick} className={styles.button + ' ' + className}>
            {icon} {text}
        </button>
    );
};

export default Button;