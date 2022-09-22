import React, {useEffect, useState} from 'react';
import store from "../store/store";
import styles from "../styles/components/AnalyticsCard.module.scss";
import {AiFillCloseCircle, AiFillInfoCircle} from "react-icons/ai";
import ReactModal from "react-modal";
import Button from "./Button";

const DepositBlock = () => {
    const user = store.user
    const [showModal, setShowModal] = useState(false)
    const [refs_count, setRefsCount] = useState(0)
    const [active_refs_count, setActiveRefsCount] = useState(0)

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
                    X3 Deposit
                </div>
                <div onClick={handleOpenModal} className={styles.card__info}>
                    <AiFillInfoCircle size={'1.2em'} />
                </div>
            </div>
            <div className={styles.card__body} style={{fontWeight: 400, paddingBottom: 0}}>
                When you first deposit to our exchange, you immediately get x3 of the deposit amount
                <Button
                    onClick={handleClick}
                    text={'Top up account'}
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
                <p>If you deposit in USDT, then you will have x3 USDT on your balance. For example: You put 10 usdt on your account - then the balance will be 30 usdt</p>
            </ReactModal>
        </div>
    );
};

export default DepositBlock;