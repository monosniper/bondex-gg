import React, {useState} from 'react';
import {AiFillCloseCircle} from "react-icons/ai";
import ReactModal from "react-modal";
import styles from "../styles/components/DepositModal.module.scss";
import store from "../store/store";
import {observer} from "mobx-react-lite";
import {$balances, $coins} from "../utils/config";
import Image from "next/image";
import {useTranslation} from "next-i18next";

const Coin = ({ title, handleClick, active }) => {
    return <div onClick={() => handleClick(title)} className={styles.coin + (' ' + (active ? styles.active : ''))}>
        <div className={styles.coin__img}>
            <Image
                src={'/assets/img/coins/'+title.toLowerCase()+'.png'}
                width={50}
                height={50}
                alt={title}
            />
        </div>
        <div className={styles.coin__title}>
            {title}
        </div>
    </div>
}

const DepositModal = () => {
    const handleCloseModal = () => store.setDepositModal(false)
    const { t, i18n } = useTranslation();
    const [coin, setCoin] = useState(null)

    const chooseCoin = (title) => {
        setCoin(title)
    }

    return (
        <ReactModal
            isOpen={store.depositModalOpen}
            contentLabel="Info modal"
            className={'modal_content'}
            overlayClassName={'modal_overlay'}
        >
            <div className="modal_header">
                <button className={'close'} onClick={handleCloseModal}>
                    <AiFillCloseCircle size={'1.4em'} />
                </button>
            </div>
            <div className={styles.alert}>
                {t('deposit_alert')}
            </div>
            <div className={styles.coins}>
                {$coins.filter(c => c.title !== 'EGM').map((_coin, i) => (
                    <Coin
                        handleClick={chooseCoin}
                        key={'coin-'+i}
                        {..._coin}
                        active={coin === _coin.title}
                    />
                ))}
            </div>
            {coin ? <div className={styles.cash}>
                {$balances[coin]}
            </div> : null}
        </ReactModal>
    );
};

export default observer(DepositModal);