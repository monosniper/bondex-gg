import React from 'react';
import styles from "../styles/components/Button.module.scss";

const InlineButton = ({ icon=null, text, onClick=() => {}, className='' }) => {
    return (
        <button onClick={onClick} className={styles.button + ' ' + styles.button_inline + ' ' + className}>
            {icon} {text}
        </button>
    );
};

export default InlineButton;