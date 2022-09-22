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
import {useTranslation} from "next-i18next";

const Edit = () => {
    const user = store.user
    const router = useRouter()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [bio, setBio] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordAgain, setNewPasswordAgain] = useState('')
    const { t, i18n } = useTranslation();

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
                            text: t('updated'),
                        }).show()
                    }
                })
            } else {
                new Noty({
                    theme: 'sunset',
                    type: 'error',
                    text: t('validation_email')
                }).show()
            }
        } else {
            new Noty({
                theme: 'sunset',
                type: 'error',
                text: t('validation_name')
            }).show()
        }
    }

    const handleSave = () => {
        if(oldPassword !== '') {
            if(newPassword !== newPasswordAgain) {
                new Noty({
                    theme: 'sunset',
                    type: 'error',
                    text: t('validation_new_password_eq')
                }).show()
            } else if (newPassword === '' || newPasswordAgain === '') {
                new Noty({
                    theme: 'sunset',
                    type: 'error',
                    text: t('validation_new_password')
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
                <div className={'label'}>{t('card_email')}</div>
                <input type="email" placeholder={t('card_email_place')} value={email} onChange={handleEmailChange}
                       className={'input'} required/>

                <div className={'label'}>{t('card_full_name')}</div>
                <input type="text" placeholder={t('card_full_name_place')} value={name} onChange={handleNameChange}
                       className={'input'} required/>

                <div className={'label'}>{t('password')}</div>
                <input type="password" placeholder={t('old_password')} value={oldPassword}
                       onChange={handleOldPasswordChange} className={'input'}/>
                <input type="password" placeholder={t('new_password')} value={newPassword}
                       onChange={handleNewPasswordChange} className={'input'}/>
                <input type="password" placeholder={t('new_password_again')} value={newPasswordAgain}
                       onChange={handleNewPasswordAgainChange} className={'input'}/>

                <div className={'label'}>{t('bio')}</div>
                <textarea placeholder={t('bio_place')} rows={8} className={'input'} onChange={handleBioChange}
                          value={bio}/>

                <div className={'center'}>
                    <InlineButton
                        onClick={handleSave}
                        icon={<BsCheckCircleFill/>}
                        text={t('save')}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default observer(Edit);