import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Balance from "../components/Balance";
import Normalizer from "../components/Normalizer";
import Button from "../components/Button";
import TokenRate from "../components/TokenRate";
import MyNetwork from "../components/MyNetwork";
import React, {useEffect, useState} from "react";
import StatusButton from "../components/StatusButton";
import InviteButton from "../components/InviteButton";
import InlineButton from "../components/InlineButton";
import Link from "next/link";
import {BiTransferAlt} from "react-icons/bi";
import Layout from "../components/Layout";
import {observer} from "mobx-react-lite";
import store from "../store/store";
import {AiFillCloseCircle} from "react-icons/ai";
import ReactModal from "react-modal";

const Home = () => {
    const user = store.user;
    const [isEarning, setIsEarning] = useState('0.0000')
    const [balance, setBalance] = useState(false)
    const [activeUntil, setActiveUntil] = useState(new Date())

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
            setBalance(user.balance)
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

            <Link href={'/transfer'}>
                <div>
                    <Button
                        icon={<BiTransferAlt />}
                        text={'Transfer '+process.env.NEXT_PUBLIC_CURRENCY_CODE}
                    />
                </div>
            </Link>

            {isEarning ? (
                <StatusButton
                    text={'Currently Earning'}
                />
            ) : (
                <Button
                    onClick={handleEarn}
                    text={'Start earning now!'}
                />
            )}

            <Button
                onClick={handleBuy}
                text={'Buy '+process.env.NEXT_PUBLIC_CURRENCY_NAME}
            />
        </Layout>
    )
}

export default observer(Home)
