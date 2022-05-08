import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Normalizer from "../components/Normalizer";
import Balance from "../components/Balance";
import Button from "../components/Button";
import {FaUserPlus} from "react-icons/fa";
import TokenRate from "../components/TokenRate";
import MyNetwork from "../components/MyNetwork";
import StatusButton from "../components/StatusButton";
import Navigation from "../components/Navigation";
import styles from "../styles/pages/Edit.module.scss";
import InlineButton from "../components/InlineButton";
import {BsCheckCircleFill} from "react-icons/bs";
import Layout from "../Layout";
import store from "../store/store";

const Card = () => {
    const [user, setUser] = useState(store.defaultUser)

    useEffect(() => {
        store.getUser().then((data) => {
            setUser(data)
        })
    }, [])

    const handleEmailChange = (e) => setUser({...user, email: e.target.value})
    const handleFullNameChange = (e) => setUser({...user, name: e.target.value})

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={'label'}>Full name</div>
                <input type="text" placeholder={'Your full name'} value={user.name} onChange={handleEmailChange} className={'input'} required />

                <div className={'label'}>E-mail</div>
                <input type="email" placeholder={'E-mail address'} value={user.name} onChange={handleFullNameChange} className={'input'} required />

                <div className={'label'}>Address</div>
                <input type="text" placeholder={'Delivery address'} className={'input'} required />

                <div className={'label'}>Post Index</div>
                <input type="text" placeholder={'Post Index'} className={'input'} required />

                <div className={'label'}>Comment</div>
                <textarea placeholder={'Your comment for the delivery...'} rows={8} className={'input'} />

                <div className={'center'}>
                    <InlineButton
                        text={'Order a card ('+process.env.NEXT_PUBLIC_CARD_COST + ' ' + process.env.NEXT_PUBLIC_CURRENCY_CODE +')'}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Card;