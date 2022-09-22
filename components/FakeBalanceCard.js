import React from 'react';
import styles from "../styles/components/FakeBalanceCard.module.scss";
import Image from "next/image";
import store from "../store/store";

const FakeBalanceCard = ({ title, full_title, balance='0.0000' }) => {
    return (
        <div onClick={() => store.setDepositModal(true)} className={styles.card + ' card'}>
            <div className={styles.card__left}>
                <Image
                    src={'/assets/img/coins/'+title.toLowerCase()+'.png'}
                    width={50}
                    height={50}
                    alt={title}
                />
                <div className={styles.card__info}>
                    <span className={styles.card__title}>{title}</span>
                    <span className={styles.card__fulltitle}>{full_title}</span>
                </div>
            </div>
            <div className={styles.card__right}>
                ${balance}
            </div>
        </div>
    );
};

export default FakeBalanceCard;