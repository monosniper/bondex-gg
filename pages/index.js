import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Balance from "../components/Balance";
import Normalizer from "../components/Normalizer";
import Button from "../components/Button";
import TokenRate from "../components/TokenRate";
import MyNetwork from "../components/MyNetwork";
import React, {useState} from "react";
import StatusButton from "../components/StatusButton";
import InviteButton from "../components/InviteButton";
import InlineButton from "../components/InlineButton";
import Link from "next/link";
import {BiTransferAlt} from "react-icons/bi";
import Layout from "../components/Layout";

export default function Home() {
    const [isEarning, setIsEarning] = useState(false)

    return (
        <Layout>
            <Balance isEarning={isEarning} />

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
                    onClick={() => setIsEarning(true)}
                    text={'Start earning now!'}
                />
            )}
        </Layout>
    )
}
