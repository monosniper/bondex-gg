import React, {useEffect, useState} from 'react';
import styles from '../styles/components/AnalyticsCard.module.scss'
import {AiFillCloseCircle, AiFillInfoCircle} from "react-icons/ai";
import ReactModal from 'react-modal';
import store from "../store/store";
import {observer} from "mobx-react-lite";
import {useTranslation} from "next-i18next";

const TokenRate = () => {
    const user = store.user;
    const [showModal, setShowModal] = useState(false)
    const [rate, setRate] = useState('0.0000')
    const { t, i18n } = useTranslation();

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    useEffect(() => {
        if(user.token_rate) {
            setRate(user.token_rate);
        }
    }, [user])

    return (
        <div className={styles.card + ' card'}>
            <div className={styles.card__header}>
                <div className={styles.card__title}>
                    {t('token rate')}
                </div>
                <div onClick={handleOpenModal} className={styles.card__info}>
                    <AiFillInfoCircle size={'1.2em'} />
                </div>
            </div>
            <div className={styles.card__body}>{rate} {process.env.NEXT_PUBLIC_CURRENCY_CODE}/{t('hour')}</div>

            <ReactModal
                isOpen={showModal}
                contentLabel="Info modal"
                className={'modal_content'}
                overlayClassName={'modal_overlay'}
            >
                <div className="modal_header">
                    <button className={'close'} onClick={handleCloseModal}>
                        <AiFillCloseCircle size={'1.4em'} />
                    </button>
                </div>
                <p>{t('token_rate_info')}</p>
            </ReactModal>
        </div>
    );
};

export default observer(TokenRate);