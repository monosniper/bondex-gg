import React, {useEffect, useState} from 'react';
import styles from '../styles/components/Header.module.scss'
import Image from "next/image";
import store from "../store/store";
import Sidebar from "./Sidebar";

const Header = () => {
    const [user, setUser] = useState(store.defaultUser)

    const handleShowSidebar = () => {
        store.setSidebar(true)
    }

    useEffect(() => {
        store.getUser().then((data) => {
            setUser(data)
        })
    }, [])

    return (
        <div>
            <div className={styles.header + ' card'}>
                <div onClick={handleShowSidebar} className={styles.avatar}>
                    <img src="/assets/img/avatar.png" alt={user.name} />
                </div>
                <div className={styles.logo}>
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </div>
            </div>

            <Sidebar name={user.name} />
        </div>
    );
};

export default Header;