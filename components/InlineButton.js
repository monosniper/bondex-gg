import React from 'react';
import styles from "../styles/components/Button.module.scss";

const InlineButton = ({ icon=null, text, className='' }) => {
    return (
        <button className={styles.button + ' ' + styles.button_inline + ' ' + className}>
            {icon} {text}
        </button>
    );
};

export default InlineButton;