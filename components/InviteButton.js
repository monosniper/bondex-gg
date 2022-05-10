import React, {useEffect, useState} from 'react';
import {FaUserPlus} from "react-icons/fa";
import Button from "./Button";
import {AiFillCloseCircle} from "react-icons/ai";
import ReactModal from "react-modal";
import {$routes} from "../http/routes";
import store from "../store/store";
import {observer} from "mobx-react-lite";

const InviteButton = () => {
    const user = store.user;
    const [showModal, setShowModal] = useState(false)
    const [ref, setRef] = useState(user.ref_code)
    const [refLink, setRefLink] = useState(null)

    const handleOpenModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    useEffect(() => {
        if(user.ref_code) {
            setRef(user.ref_code)
        }
    }, [user])

    useEffect(() => {
        if(ref) {
            setRefLink(process.env.NEXT_PUBLIC_APP_URL + $routes.registerRef(ref))
        }
    }, [ref])

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
                <a href={refLink}>{refLink ? refLink : '...'}</a>
            </ReactModal>
        </div>
    );
};

export default observer(InviteButton);