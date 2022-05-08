import React, {useState} from 'react';
import styles from '../styles/components/Balance.module.scss'
import {BsCurrencyBitcoin} from "react-icons/bs";
import ReactMomentCountDown from 'react-moment-countdown';
import {BiTimeFive} from "react-icons/bi";

const Balance = ({ isEarning=false }) => {
    const [timeLeft, setTimeLeft] = useState(null)
    const dateInFuture = new Date('2023-12-31');

    return (
        <div className={styles.balance + ' card'}>
            <div className={styles.balance__left}>
                <div className={styles.balance__title}>Token Balance:</div>
                <div className={styles.balance__count}>0.0000 <span>{process.env.NEXT_PUBLIC_CURRENCY_CODE}</span></div>
                {isEarning ? (
                    <div className={styles.balance__time}>
                        <BiTimeFive />
                        <ReactMomentCountDown toDate={dateInFuture} sourceFormatMask='HH:mm:ss' />
                    </div>
                ) : null}
            </div>
            <div className={styles.balance__right + (isEarning ? ' ' + styles.active : '')}>
                <BsCurrencyBitcoin size={'8em'} />
            </div>
        </div>
    );
};

export default Balance;