import React, {useEffect, useState} from 'react';
import Header from "../components/Header";
import Normalizer from "../components/Normalizer";
import Navigation from "../components/Navigation";
import {MdModeEditOutline} from "react-icons/md";
import Link from "next/link";
import Avatar from "../components/Avatar";
import FullName from "../components/FullName";
import InlineButton from "../components/InlineButton";
import Bio from "../components/Bio";
import store from "../store/store";
import Layout from "../Layout";

const Profile = () => {
    const [user, setUser] = useState(store.defaultUser)

    useEffect(() => {
        store.getUser().then((data) => {
            setUser(data)
        })
    }, [])

    return (
        <Layout>
            <Avatar name={user.username} />

            <FullName name={user.username} />

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

            <Bio bio={user.bio} />
        </Layout>
    );
};

export default Profile;