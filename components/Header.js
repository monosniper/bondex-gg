import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Header.module.scss'
import Image from "next/image";
import store from "../store/store";
import Sidebar from "./Sidebar";
import {observer} from "mobx-react-lite";
import {GiHamburgerMenu} from "react-icons/gi";

const Header = () => {
    const {name} = store.user

    const handleShowSidebar = () => {
        store.setSidebar(true)
    }

    return (
        <div>
            <div className={styles.header + ' card'}>
                <div onClick={handleShowSidebar} className={styles.burger}>
                    <GiHamburgerMenu size={'32px'} color={'#fff'} />

                    {/*<img src="/assets/img/avatar.png" alt={name} />*/}
                </div>
                <div className={styles.logo}>
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </div>
            </div>

            <Sidebar name={name} />
        </div>
    );
};

export default observer(Header);