import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Balance.module.scss'
import {BsCurrencyBitcoin} from "react-icons/bs";
import {BiTimeFive} from "react-icons/bi";
import store from "../store/store";
import {observer} from "mobx-react-lite";
import Countdown from "react-countdown";
import {useTranslation} from "next-i18next";

const Balance = ({ isEarning=false, balance, handleStop=() => {} }) => {
    const user = store.user;
    const [timeLeft, setTimeLeft] = useState(new Date(Date.now() + 3600 * 1000 * 24))
    const { t, i18n } = useTranslation();

    useEffect(() => {
        if(user.activeUntil) {
            setTimeLeft(user.activeUntil)
        }
    }, [user])

    return (
        <div className={styles.balance + ' card'}>
            <div className={styles.balance__left}>
                <div className={styles.balance__title}>{t('token_balance')}</div>
                <div className={styles.balance__count}>{balance} <span>{process.env.NEXT_PUBLIC_CURRENCY_CODE}</span></div>
                {isEarning ? (
                    <div className={styles.balance__time}>
                        <BiTimeFive />
                        <Countdown
                            date={timeLeft}
                            onStop={(count) => count.start()}
                            autoStart
                            daysInHours
                            onComplete={handleStop}
                        />
                    </div>
                ) : null}
            </div>
            <div className={styles.balance__right + (isEarning ? ' ' + styles.active : '')}>
                <BsCurrencyBitcoin size={'8em'} />
            </div>
        </div>
    );
};

export default observer(Balance);