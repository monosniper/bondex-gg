import React from 'react';
import Layout from "../components/Layout";
import styles from '../styles/pages/Edit.module.scss'
import Image from "next/image";
import {useTranslation} from "next-i18next";

const P2P = () => {
    const { t, i18n } = useTranslation();

    return (
        <Layout>
            <div className={styles.wrapper}>
                <p style={{marginBottom: '10px',textAlign: "center",display:"block"}}>{t('under dev')}.</p>
                <img src="../assets/img/p2p.png" alt="p2p"/>
            </div>
        </Layout>
    );
};

export default P2P;