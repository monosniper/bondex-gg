import React, {useState} from 'react';
import {AiFillCloseCircle} from "react-icons/ai";
import ReactModal from "react-modal";

const DepositModal = () => {
    const [showModal, setShowModal] = useState(false)

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    return (
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
            <p>My Network is the number of your referrals / active at the moment. To get referrals click on the button &quot;Invite your contacts!&quot;.</p>
        </ReactModal>
    );
};

export default DepositModal;