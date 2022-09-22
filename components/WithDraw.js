import React, {useState} from 'react';
import {useTranslation} from "next-i18next";
import Button from "./Button";
import {FaUserPlus} from "react-icons/fa";
import ReactModal from "react-modal";
import {AiFillCloseCircle} from "react-icons/ai";
import {observer} from "mobx-react-lite";

const WithDraw = () => {
    const [showModal, setShowModal] = useState(false)
    const { t, i18n } = useTranslation();

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    return (
        <div>
            <Button
                onClick={handleOpenModal}
                // icon={<FaUserPlus size={'1.2em'}/>}
                text={t('withdraw')}
                className={'invite_btn'}
            />

            <ReactModal
                isOpen={showModal}
                contentLabel="Invite modal"
                className={'modal_content'}
                overlayClassName={'modal_overlay'}
            >
                <div className="modal_header">
                    <button className={'close'} onClick={handleCloseModal}>
                        <AiFillCloseCircle size={'1.4em'} />
                    </button>
                </div>
                <p>{t('withdraw_info')}</p>
            </ReactModal>
        </div>
    );
};

export default observer(WithDraw);