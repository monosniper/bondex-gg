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
import {useTranslation} from "next-i18next";
import {$coins} from "../utils/config";
import WithDraw from "../components/WithDraw";

const Profile = () => {
    const {name, bio} = store.user
    const balance = useBalance()
    const { t, i18n } = useTranslation();

    return (
        <Layout>
            <Avatar name={name} />

            <FullName name={name} />

            <div className={'center'}>
                <Link href={'/profile/edit'}>
                    <div>
                        <InlineButton
                            icon={<MdModeEditOutline />}
                            text={t('edit profile')}
                        />
                    </div>
                </Link>
            </div>

            <Bio bio={bio} />

            {$coins.map(coin => {
                if(coin.title === 'EGM') {
                    coin.balance = balance
                }

                return coin
            }).map((balance, i) => <div key={'balance-'+i} className="row">
                <FakeBalanceCard  {...balance} />
            </div>)}

            <WithDraw />
        </Layout>
    );
};

export default observer(Profile);