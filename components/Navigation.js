import React from 'react';
import Link from "next/link";
import styles from '../styles/components/Navigation.module.scss'
import {AiFillCreditCard} from "react-icons/ai";
import {FaUserCircle} from "react-icons/fa";
import {BsCurrencyBitcoin} from "react-icons/bs";
import {useRouter} from "next/router";

const Navigation = () => {
    const router = useRouter()

    return (
        <div className={styles.nav + ' card'}>
            <Link href={'/profile'}>
                <div className={styles.nav__item + ' ' + (router.pathname === '/profile' ? styles.active : '')}>
                    <FaUserCircle size={'3em'} />
                </div>
            </Link>
            <Link href={'/'}>
                <div className={styles.nav__item + ' ' + (router.pathname === '/' ? styles.active : '')}>
                    <BsCurrencyBitcoin size={'3em'} />
                </div>
            </Link>
            <Link href={'/card'}>
                <div className={styles.nav__item + ' ' + (router.pathname === '/card' ? styles.active : '')}>
                    <AiFillCreditCard size={'3em'} />
                </div>
            </Link>
        </div>
    );
};

export default Navigation;