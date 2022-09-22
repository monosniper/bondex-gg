import React, {useEffect, useState} from 'react';
import styles from "../styles/components/Sidebar.module.scss";
import header_styles from '../styles/components/Header.module.scss'
import {IoMdClose} from "react-icons/io";
import InlineButton from "./InlineButton";
import store from "../store/store";
import {RiBook2Fill, RiGitRepositoryPrivateLine} from "react-icons/ri";
import {GoBook} from "react-icons/go";
import {observer} from "mobx-react-lite";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import {GiPayMoney} from "react-icons/gi";
import {SERVER_URL} from "../http";

const Sidebar = ({ name }) => {
    const router = useRouter()

    const handleLogOut = () => {
        store.logout().then(() => router.push($routes.login))
    }

    const handleHide = () => {
        store.setSidebar(false)
    }

    const handleProfileClick = () => {
        router.push($routes.profile).then(r => handleHide())
    }

    return (
        <div className={styles.sidebar + ' ' + (store.isSidebarShow ? styles.active : '')}>
            <div className={styles.sidebar__header}>
                <div onClick={handleProfileClick} className={styles.sidebar__left}>
                    <div className={header_styles.avatar}>
                        <img src="/assets/img/avatar.png" alt={name} />
                    </div>
                    <div className={styles.sidebar__name}>{name}</div>
                </div>
                <div className={styles.sidebar__right} onClick={handleHide}>
                    <IoMdClose size={'1.5em'} />
                </div>
            </div>

            <div className={styles.sidebar__menu}>
                {/*<div className={styles.sidebar__item}><GoBook size ='1.3em' />User Agreement</div>*/}
                <a rel="noreferrer" href={SERVER_URL + '/privacy.docx'} target={'_blank'} className={styles.sidebar__item}><RiGitRepositoryPrivateLine size ='1.3em' />Privacy Policy</a>
                <a rel="noreferrer" href={'#'} target={'_blank'} className={styles.sidebar__item}><GiPayMoney size ='1.3em' />Investment</a>
                {/*<div className={styles.sidebar__item}><RiBook2Fill size={'1.3em'} />Learn more</div>*/}
            </div>

            <InlineButton
                outline
                onClick={handleLogOut}
                text={'Log out'}
            />

            <div className={styles.sidebar__footer}>
                <a href={"mailto:" + process.env.NEXT_PUBLIC_SUPPORT_EMAIL}>{process.env.NEXT_PUBLIC_SUPPORT_EMAIL}</a>
            </div>
        </div>
    );
};

export default observer(Sidebar);