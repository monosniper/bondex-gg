import React, {useEffect, useState} from 'react';
import InlineButton from "../../components/InlineButton";
import styles from '../../styles/pages/Edit.module.scss'
import {BsCheckCircleFill} from "react-icons/bs";
import store from "../../store/store";
import Layout from "../../Layout";

const Edit = () => {
    const [user, setUser] = useState(store.defaultUser)

    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [oldPasswordAgain, setNewPasswordAgain] = useState('')

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handleOldPasswordChange = (e) => setOldPassword(e.target.value)
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value)
    const handleNewPasswordAgainChange = (e) => setNewPasswordAgain(e.target.value)
    const handleBioChange = (e) => setBio(e.target.value)

    useEffect(() => {
        store.getUser().then((data) => {
            setUser(data)
            console.log(user.username)
            setUsername(user.username)
            setEmail(user.email)
            setBio(user.bio)
        })
    }, [])

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={'label'}>E-mail</div>
                <input type="email" placeholder={'E-mail address'} value={email} onChange={handleEmailChange}
                       className={'input'} required/>

                <div className={'label'}>Username</div>
                <input type="text" placeholder={'Username'} value={username} onChange={handleUsernameChange}
                       className={'input'} required/>

                <div className={'label'}>Password</div>
                <input type="password" placeholder={'Old password'} value={oldPassword}
                       onChange={handleOldPasswordChange} className={'input'}/>
                <input type="password" placeholder={'New password'} value={newPassword}
                       onChange={handleNewPasswordChange} className={'input'}/>
                <input type="password" placeholder={'New password again'} value={oldPasswordAgain}
                       onChange={handleNewPasswordAgainChange} className={'input'}/>

                <div className={'label'}>Bio</div>
                <textarea placeholder={'Some info about you...'} rows={8} className={'input'} onChange={handleBioChange}
                          value={bio}/>

                <div className={'center'}>
                    <InlineButton
                        icon={<BsCheckCircleFill/>}
                        text={'Save'}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default Edit;