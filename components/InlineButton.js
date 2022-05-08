import React from 'react';
import styles from "../styles/components/Button.module.scss";

const InlineButton = ({ outline=false, icon=null, text, onClick=() => {}, className='' }) => {
    return (
        <button
            onClick={onClick}
            className={
                styles.button + ' ' +
                styles.button_inline + ' ' +
                (outline ? styles.button_status : '') +
                className
            }
        >
            {icon} {text}
        </button>
    );
};

export default InlineButton;