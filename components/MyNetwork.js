import React, {useState} from 'react';
import styles from "../styles/components/AnalyticsCard.module.scss";
import {AiFillCloseCircle, AiFillInfoCircle} from "react-icons/ai";
import ReactModal from "react-modal";

const MyNetwork = () => {
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    return (
        <div className={styles.card + ' card'}>
            <div className={styles.card__header}>
                <div className={styles.card__title}>
                    My Network
                </div>
                <div onClick={handleOpenModal} className={styles.card__info}>
                    <AiFillInfoCircle size={'1.2em'} />
                </div>
            </div>
            <div className={styles.card__body}>
                0/0
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
                <p>My Network is the number of your referrals / active at the moment. To get referrals click on the button "Invite your contacts!".</p>
            </ReactModal>
        </div>
    );
};

export default MyNetwork;