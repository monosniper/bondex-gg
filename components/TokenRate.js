import React, {useEffect, useState} from 'react';
import styles from '../styles/components/AnalyticsCard.module.scss'
import {AiFillCloseCircle, AiFillInfoCircle} from "react-icons/ai";
import ReactModal from 'react-modal';

const TokenRate = () => {
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    return (
        <div className={styles.card + ' card'}>
            <div className={styles.card__header}>
                <div className={styles.card__title}>
                    Token Rate
                </div>
                <div onClick={handleOpenModal} className={styles.card__info}>
                    <AiFillInfoCircle size={'1.2em'} />
                </div>
            </div>
            <div className={styles.card__body}>0.00 {process.env.NEXT_PUBLIC_CURRENCY_CODE}/Hr</div>

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
                <p>Token rate is the rate of currency farming per hour. It increases in direct proportion to the number of your referrals.</p>
            </ReactModal>
        </div>
    );
};

export default TokenRate;