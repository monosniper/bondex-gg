import React, {useState} from 'react';
import Header from "../components/Header";
import Normalizer from "../components/Normalizer";
import Avatar from "../components/Avatar";
import FullName from "../components/FullName";
import Link from "next/link";
import InlineButton from "../components/InlineButton";
import {BiTransferAlt} from "react-icons/bi";
import styles from '../styles/pages/Edit.module.scss'
import Bio from "../components/Bio";
import Navigation from "../components/Navigation";
import store from "../store/store";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import Layout from "../Layout";

const Transfer = () => {
    const [username, setUsername] = useState('')
    const [amount, setAmount] = useState(0.2)
    const router = useRouter()

    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handleAmountChange = (e) => setAmount(e.target.value)
    const handleTransfer = () => {
        store.makeTransfer({username, amount}).then(() => {
            router.push($routes.index)
        })
    }

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={'label'}>Username</div>
                <input type="text" placeholder={'Username'} value={username} onChange={handleUsernameChange} className={'input'} required />

                <div className={'label'}>Amount ({process.env.NEXT_PUBLIC_CURRENCY_CODE})</div>
                <input type="number" step={'0.1'} min={0.2} placeholder={'Amount'} value={amount} onChange={handleAmountChange} className={'input'} required />
            </div>

            <div className={'center'}>
                <InlineButton
                    onClick={handleTransfer}
                    icon={<BiTransferAlt />}
                    text={'Transfer'}
                />
            </div>
        </Layout>
    );
};

export default Transfer;