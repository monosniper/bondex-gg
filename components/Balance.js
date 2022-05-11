import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Balance.module.scss'
import {BsCurrencyBitcoin} from "react-icons/bs";
import ReactMomentCountDown from 'react-moment-countdown';
import {BiTimeFive} from "react-icons/bi";
import store from "../store/store";
import {observer} from "mobx-react-lite";

const Balance = ({ isEarning=false, handleStop=() => {} }) => {
    const user = store.user;
    const [balance, setBalance] = useState('0.0000')
    const [timeLeft, setTimeLeft] = useState(new Date(Date.now() + (3600*1000*24)))

    useEffect(() => {
        if(user.balance) {
            setBalance(user.balance);

            if(new Date(user.activeUntil) < Date.now()) {
                handleStop()
            } else setTimeLeft(new Date(user.activeUntil));
        }
    }, [user])

    return (
        <div className={styles.balance + ' card'}>
            <div className={styles.balance__left}>
                <div className={styles.balance__title}>Token Balance:</div>
                <div className={styles.balance__count}>{balance} <span>{process.env.NEXT_PUBLIC_CURRENCY_CODE}</span></div>
                {isEarning ? (
                    <div className={styles.balance__time}>
                        <BiTimeFive />
                        <ReactMomentCountDown
                            toDate={timeLeft}
                            sourceFormatMask='HH:mm:ss'
                            onCountdownEnd={handleStop}
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