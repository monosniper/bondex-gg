import React, {useState} from 'react';
import styles from "../styles/pages/Edit.module.scss";
import InlineButton from "../components/InlineButton";
import Layout from "../components/Layout";
import store from "../store/store";
import {observer} from "mobx-react-lite";
import Noty from 'noty'
import {useTranslation} from "next-i18next";

const Card = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [post_index, setPostIndex] = useState('')
    const [comment, setComment] = useState('')
    const { t, i18n } = useTranslation();

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleFullNameChange = (e) => setName(e.target.value)
    const handleAddressChange = (e) => setAddress(e.target.value)
    const handlePostIndexChange = (e) => setPostIndex(e.target.value)
    const handleCommentChange = (e) => setComment(e.target.value)

    const handleOrder = () => {
        if(
            email === '' ||
            name === '' ||
            address === '' ||
            post_index === ''
        ) {
            new Noty({
                theme: 'sunset',
                type: 'error',
                text: t('validation_order_required'),
            }).show()
        } else {
            store.saveCard({
                email,
                name,
                address,
                post_index,
                comment,
            }).then(rs => {
                new Noty({
                    theme: 'sunset',
                    type: 'success',
                    text: t('order in process'),
                }).show()
            }).catch(rs => {
                new Noty({
                    theme: 'sunset',
                    type: 'error',
                    text: rs.response.data.message,
                }).show()
            })
        }
    }

    return (
        <Layout>
            <div className={styles.wrapper}>
                <img style={{maxWidth: '100%'}} src="/assets/img/card.png" alt="Card"/>

                <div className={'label'}>{t('card_full_name')}</div>
                <input type="text" placeholder={t('card_full_name_place')} value={email} onChange={handleEmailChange} className={'input'} required />

                <div className={'label'}>{t('card_email')}</div>
                <input type="email" placeholder={t('card_email_place')} value={name} onChange={handleFullNameChange} className={'input'} required />

                <div className={'label'}>{t('card_address')}</div>
                <input type="text" placeholder={t('card_address_place')} value={address} onChange={handleAddressChange} className={'input'} required />

                <div className={'label'}>{t('card_post')}</div>
                <input type="text" placeholder={t('card_post_place')} value={post_index} onChange={handlePostIndexChange} className={'input'} required />

                <div className={'label'}>{t('card_comment')}</div>
                <textarea placeholder={t('card_comment_place')} rows={8} onChange={handleCommentChange} value={comment} className={'input'} />

                <div className={'center'}>
                    <InlineButton
                        onClick={handleOrder}
                        text={t('order card') + ' ('+process.env.NEXT_PUBLIC_CARD_COST + ' ' + process.env.NEXT_PUBLIC_CURRENCY_CODE +')'}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default observer(Card);