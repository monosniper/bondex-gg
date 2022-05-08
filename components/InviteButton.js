import React, {useState} from 'react';
import {FaUserPlus} from "react-icons/fa";
import Button from "./Button";
import {AiFillCloseCircle} from "react-icons/ai";
import ReactModal from "react-modal";

const InviteButton = () => {
    const [showModal, setShowModal] = useState(false)
    const [refLink, setRefLink] = useState('https://www.bondex-gg.club/register?ref=6GxBf')

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    return (
        <div>
            <Button
                onClick={handleOpenModal}
                icon={<FaUserPlus size={'1.2em'}/>}
                text={'Invite your contacts!'}
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
                <p>Share this link to your friends to make them your referrals:</p>
                <a href={refLink}>{refLink}</a>
            </ReactModal>
        </div>
    );
};

export default InviteButton;