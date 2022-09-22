import React from 'react';
import {MdModeEditOutline} from "react-icons/md";
import Link from "next/link";
import Avatar from "../components/Avatar";
import FullName from "../components/FullName";
import InlineButton from "../components/InlineButton";
import Bio from "../components/Bio";
import store from "../store/store";
import Layout from "../components/Layout";
import {observer} from "mobx-react-lite";
import FakeBalanceCard from "../components/FakeBalanceCard";
import useBalance from "../hooks/useBalance";

const Profile = () => {
    const {name, bio} = store.user
    const balance = useBalance()

    const balances = [
        {
            title: 'EGM',
            full_title: 'Enigma Coin',
            balance
        },
        {
            title: 'BTC',
            full_title: 'Bitcoin',
        },
        {
            title: 'BnB',
            full_title: 'Binance Coin',
        },
        {
            title: 'BUSD',
            full_title: 'BUSD',
        },
        {
            title: 'ETH',
            full_title: 'Etherium',
        },
        {
            title: 'USDT',
            full_title: 'Tether',
        },
    ];

    return (
        <Layout>
            <Avatar name={name} />

            <FullName name={name} />

            <div className={'center'}>
                <Link href={'/profile/edit'}>
                    <div>
                        <InlineButton
                            icon={<MdModeEditOutline />}
                            text={'Edit profile'}
                        />
                    </div>
                </Link>
            </div>

            <Bio bio={bio} />

            {balances.map((balance, i) => <div key={'balance-'+i} className="row">
                <FakeBalanceCard  {...balance} />
            </div>)}
        </Layout>
    );
};

export default observer(Profile);