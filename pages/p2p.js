import React from 'react';
import Layout from "../components/Layout";
import styles from '../styles/pages/Edit.module.scss'
import Image from "next/image";

const P2P = () => {
    return (
        <Layout>
            <div className={styles.wrapper}>
                <p style={{marginBottom: '10px',textAlign: "center",display:"block"}}>This section is under development.</p>
                <img src="../assets/img/p2p.png" alt="p2p"/>
            </div>
        </Layout>
    );
};

export default P2P;