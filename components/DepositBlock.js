import React, {useEffect, useState} from 'react';
import store from "../store/store";
import styles from "../styles/components/AnalyticsCard.module.scss";
import {AiFillCloseCircle, AiFillInfoCircle} from "react-icons/ai";
import ReactModal from "react-modal";
import Button from "./Button";
import {useTranslation} from "next-i18next";

const DepositBlock = () => {
    const user = store.user
    const [showModal, setShowModal] = useState(false)
    const [refs_count, setRefsCount] = useState(0)
    const [active_refs_count, setActiveRefsCount] = useState(0)
    const { t, i18n } = useTranslation();

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    const handleClick = () => {

    }

    useEffect(() => {
        if(user.refs) {
            setRefsCount(user.refs.all)
            setActiveRefsCount(user.refs.active)
        }
    }, [user.refs])

    return (
        <div className={styles.card + ' card'}>
            <div className={styles.card__header}>
                <div className={styles.card__title}>
                    {t('deposit')}
                </div>
                <div onClick={handleOpenModal} className={styles.card__info}>
                    <AiFillInfoCircle size={'1.2em'} />
                </div>
            </div>
            <div className={styles.card__body} style={{fontWeight: 400, paddingBottom: 0}}>
                {t('deposit_text')}
                <Button
                    onClick={() => store.setDepositModal(true)}
                    text={t('get_bonus')}
                />
            </div>

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
                <p>{t('deposit_info')}</p>
            </ReactModal>
        </div>
    );
};

export default DepositBlock;