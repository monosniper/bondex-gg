import React, {useEffect, useState} from 'react';
import InlineButton from "../../components/InlineButton";
import styles from '../../styles/pages/Edit.module.scss'
import {BsCheckCircleFill} from "react-icons/bs";
import store from "../../store/store";
import Layout from "../../components/Layout";
import Noty from "noty";
import {$routes} from "../../http/routes";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";

const Edit = () => {
    const user = store.user
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleNameChange = (e) => setName(e.target.value)
    const handleOldPasswordChange = (e) => setOldPassword(e.target.value)
    const handleNewPasswordChange = (e) => setNewPassword(e.target.value)
    const handleNewPasswordAgainChange = (e) => setNewPasswordAgain(e.target.value)
    const handleBioChange = (e) => setBio(e.target.value)

    useEffect(() => {
        if(user) {
            setEmail(user.email)
            setName(user.name)
            setBio(user.bio)
        }
    }, [])

    const update = () => {
        if(name !== '') {
            if(email !== '') {
                store.updateProfile({name, email, bio}).then(rs => {
                    if(rs.status === 'error') {
                        if(rs.message !== '') {
                            new Noty({
                                theme: 'sunset',
                                type: 'error',
                                text: rs.message,
                            }).show()
                        }

                        rs.errors.forEach((err) => {
                            new Noty({
                                theme: 'sunset',
                                type: 'error',
                                text: `${err.param}: ${err.msg}`,
                            }).show()
                        })
                    } else {
                        router.push($routes.profile)

                        new Noty({
                            theme: 'sunset',
                            type: 'success',
                            text: `Updated successfully.`,
                        }).show()
                    }
                })
            } else {
                new Noty({
                    theme: 'sunset',
                    type: 'error',
                    text: 'The email field is required!'
                }).show()
            }
        } else {
            new Noty({
                theme: 'sunset',
                type: 'error',
                text: 'The name field is required!'
            }).show()
        }
    }

    const handleSave = () => {
        if(oldPassword !== '') {
            if(newPassword !== newPasswordAgain) {
                new Noty({
                    theme: 'sunset',
                    type: 'error',
                    text: 'New password is not equal his confirmation'
                }).show()
            } else if (newPassword === '' || newPasswordAgain === '') {
                new Noty({
                    theme: 'sunset',
                    type: 'error',
                    text: 'New password fields are required to change password.'
                }).show()
            } else {
                store.changePassword({oldPassword, newPassword}).then(rs => {
                    if(rs.status === 'error') {
                        new Noty({
                            theme: 'sunset',
                            type: 'error',
                            text: rs.message,
                        }).show()
                    } else update()
                })
            }
        } else update()
    }

    return (
        <Layout>
            <div className={styles.wrapper}>
                <div className={'label'}>E-mail</div>
                <input type="email" placeholder={'E-mail address'} value={email} onChange={handleEmailChange}
                       className={'input'} required/>

                <div className={'label'}>Full name</div>
                <input type="text" placeholder={'Full name'} value={name} onChange={handleNameChange}
                       className={'input'} required/>

                <div className={'label'}>Password</div>
                <input type="password" placeholder={'Old password'} value={oldPassword}
                       onChange={handleOldPasswordChange} className={'input'}/>
                <input type="password" placeholder={'New password'} value={newPassword}
                       onChange={handleNewPasswordChange} className={'input'}/>
                <input type="password" placeholder={'New password again'} value={newPasswordAgain}
                       onChange={handleNewPasswordAgainChange} className={'input'}/>

                <div className={'label'}>Bio</div>
                <textarea placeholder={'Some info about you...'} rows={8} className={'input'} onChange={handleBioChange}
                          value={bio}/>

                <div className={'center'}>
                    <InlineButton
                        onClick={handleSave}
                        icon={<BsCheckCircleFill/>}
                        text={'Save'}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default observer(Edit);