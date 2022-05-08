import React from 'react';
import styles from '../styles/components/Avatar.module.scss'
import Image from "next/image";

const Avatar = ({ name }) => {
    return (
        <div className={styles.avatar}>
            <Image
                src={'/../public/assets/img/ava.jpg'}
                width={150}
                height={150}
                alt={name}
            />
        </div>
    );
};

export default Avatar;