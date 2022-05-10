import React, {useState} from 'react';
import InlineButton from "../components/InlineButton";
import {BiTransferAlt} from "react-icons/bi";
import styles from '../styles/pages/Edit.module.scss'
import store from "../store/store";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import Layout from "../components/Layout";
import {FiCopy} from "react-icons/fi";
import Button from "../components/Button";
import Noty from 'noty';
import {observer} from "mobx-react-lite";

const Transfer = () => {
    const user = store.user
    const curr = process.env.NEXT_PUBLIC_CURRENCY_CODE
    const [number, setNumber] = useState('')
    const [amount, setAmount] = useState(0.2)
    const router = useRouter()

    const handleNumberChange = (e) => setNumber(e.target.value)
    const handleAmountChange = (e) => setAmount(e.target.value)
    const handleTransfer = () => {
        store.makeTransfer({number, amount}).then((rs) => {
            console.log(rs)
            new Noty({
                theme: 'sunset',
                type: 'success',
                text: `${amount} ${curr} transferred to account ${number} successfully.`,
            }).show();

            router.push($routes.index)
        }).catch((rs) => {
            new Noty({
                theme: 'sunset',
                type: 'error',
                text: rs.response.data.message,
            }).show();
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

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={'label'}>Your balance number</div>
                <input type="text" style={{fontSize: 11}} readOnly value={user.number} className={'input'} />

                <div className={'center'}>
                    <InlineButton
                        onClick={handleCopy}
                        icon={<FiCopy />}
                        text={'Copy'}
                    />
                </div>

                <div className={'label'}>Balance number</div>
                <input type="text" placeholder={'0x123abc456...'} value={number} onChange={handleNumberChange} className={'input'} required />

                <div className={'label'}>Amount ({curr})</div>
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

export default observer(Transfer);