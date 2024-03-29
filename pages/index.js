import Balance from "../components/Balance";
import Button from "../components/Button";
import TokenRate from "../components/TokenRate";
import MyNetwork from "../components/MyNetwork";
import React, {useEffect, useState} from "react";
import StatusButton from "../components/StatusButton";
import InviteButton from "../components/InviteButton";
import Link from "next/link";
import {BiTransferAlt} from "react-icons/bi";
import Layout from "../components/Layout";
import {observer} from "mobx-react-lite";
import store from "../store/store";
import DepositBlock from "../components/DepositBlock";
import useBalance from "../hooks/useBalance";
import {useTranslation} from "next-i18next";

const Home = () => {
    const user = store.user;
    const [isEarning, setIsEarning] = useState('0.0000')
    const [activeUntil, setActiveUntil] = useState(new Date())
    const balance = useBalance()
    const { t, i18n } = useTranslation();

    const handleEarn = () => {
        if(user.isActive !== undefined) {
            store.startEarn().then(() => {
                setIsEarning(true)
            })
        }
    }

    const handleStop = () => {
        if(user.isActive !== undefined) {
            store.endEarn().then(() => {
                setIsEarning(false)
            })
        }
    }

    const handleBuy = () => {

    }

    useEffect(() => {
        if(user.isActive !== undefined) {
            setIsEarning(user.isActive)
            setActiveUntil(user.activeUntil)
        }
    }, [user])

    return (
        <Layout>
            <Balance
                isEarning={isEarning}
                balance={balance}
                activeUntil={activeUntil}
                handleStop={handleStop}
            />

            <InviteButton />

            <div className={'row'}>
                <TokenRate/>
                <MyNetwork/>
            </div>

            <div className={'row'}>
                <DepositBlock/>
            </div>

            <Link href={'/transfer'}>
                <div>
                    <Button
                        icon={<BiTransferAlt />}
                        text={t('transfer')+' '+process.env.NEXT_PUBLIC_CURRENCY_CODE}
                    />
                </div>
            </Link>

            {isEarning ? (
                <StatusButton
                    text={t('earning')}
                />
            ) : (
                <Button
                    onClick={handleEarn}
                    text={t('earning start')}
                />
            )}

            <Button
                onClick={handleBuy}
                text={t('buy')+' '+process.env.NEXT_PUBLIC_CURRENCY_NAME}
            />
        </Layout>
    )
}

export default observer(Home)
