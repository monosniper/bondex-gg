import React from 'react';
import styles from "../styles/components/Button.module.scss";

const StatusButton = ({ icon=null, text, className='' }) => {
    return (
        <button className={styles.button + ' ' + styles.button_status + ' ' + className}>
            {icon} {text}
        </button>
    );
};

export default StatusButton;