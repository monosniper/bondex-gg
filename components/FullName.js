import React from 'react';
import styles from '../styles/components/FullName.module.scss'

const FullName = ({ name }) => {
    return (
        <div className={styles.fullname}>{name}</div>
    );
};

export default FullName;