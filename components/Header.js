import React from 'react';
import styles from '../styles/components/Header.module.scss'
import Image from "next/image";
import store from "../store/store";

const Header = () => {
    const user = store.getUser()

    return (
        <div className={styles.header + ' card'}>
            <div className={styles.avatar}>
                <Image
                    src={'/../public/assets/img/ava.jpg'}
                    width={50}
                    height={50}
                    alt={user.name}
                />
            </div>
            <div className={styles.logo}>
                {process.env.NEXT_PUBLIC_APP_NAME}
            </div>
        </div>
    );
};

export default Header;