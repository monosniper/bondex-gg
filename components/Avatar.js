import React from 'react';
import styles from '../styles/components/Avatar.module.scss'
import Image from "next/image";

const Avatar = ({ name }) => {
    return (
        <div className={styles.avatar}>
            <img src="/assets/img/avatar.png" alt={name}/>
        </div>
    );
};

export default Avatar;