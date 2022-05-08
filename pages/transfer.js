import React, {useEffect, useState} from 'react';
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
import {FiCopy} from "react-icons/fi";
import Button from "../components/Button";
import Noty from 'noty';

const Transfer = () => {
    const [user, setUser] = useState(store.defaultUser)
    const [number, setNumber] = useState('')
    const [amount, setAmount] = useState(0.2)
    const router = useRouter()

    const handleNumberChange = (e) => setNumber(e.target.value)
    const handleAmountChange = (e) => setAmount(e.target.value)
    const handleTransfer = () => {
        store.makeTransfer({number, amount}).then(() => {
            router.push($routes.index)
        })
    }
    const handleCopy = () => {
        navigator.clipboard.writeText(user.number).then(() => {
            new Noty({
                theme: 'sunset',
                type: 'success',
                text: 'Copied successfully!',
            }).show();
        }).catch((e) => {
            console.log(e)
        })
    }

    useEffect(() => {
        store.getUser().then((data) => {
            setUser(data)
        })
    }, [])

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={'label'}>Your balance number</div>
                <input type="text" readOnly value={user.number} className={'input'} />

                <div className={'center'}>
                    <InlineButton
                        onClick={handleCopy}
                        icon={<FiCopy />}
                        text={'Copy'}
                    />
                </div>

                <div className={'label'}>Balance number</div>
                <input type="text" placeholder={'egm_123456789...'} value={number} onChange={handleNumberChange} className={'input'} required />

                <div className={'label'}>Amount ({process.env.NEXT_PUBLIC_CURRENCY_CODE})</div>
                <input type="number" step={'0.1'} min={0.2} placeholder={'Amount'} value={amount} onChange={handleAmountChange} className={'input'} required />
            </div>

            <Button
                onClick={handleTransfer}
                icon={<BiTransferAlt />}
                text={'Transfer'}
            />
        </Layout>
    );
};

export default Transfer;