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

const Home = () => {
    const user = store.user;
    const [isEarning, setIsEarning] = useState(false)

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

    useEffect(() => {
        if(user.isActive !== undefined) {
            setIsEarning(user.isActive)
        }
    }, [user.isActive])

    return (
        <Layout>
            <Balance isEarning={isEarning} handleStop />

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
        </Layout>
    )
}

export default observer(Home)
