import React, {useState} from 'react';
import styles from "../styles/pages/Edit.module.scss";
import InlineButton from "../components/InlineButton";
import Layout from "../components/Layout";
import store from "../store/store";
import {observer} from "mobx-react-lite";
import Noty from 'noty'

const Card = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [post_index, setPostIndex] = useState('')
    const [comment, setComment] = useState('')

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
                text: 'Fields email, name, address and post index are required!',
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
                    text: 'Your order is in process, thank you!',
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

                <div className={'label'}>Full name</div>
                <input type="text" placeholder={'Your full name'} value={email} onChange={handleEmailChange} className={'input'} required />

                <div className={'label'}>E-mail</div>
                <input type="email" placeholder={'E-mail address'} value={name} onChange={handleFullNameChange} className={'input'} required />

                <div className={'label'}>Address</div>
                <input type="text" placeholder={'Delivery address'} value={address} onChange={handleAddressChange} className={'input'} required />

                <div className={'label'}>Post Index</div>
                <input type="text" placeholder={'Post Index'} value={post_index} onChange={handlePostIndexChange} className={'input'} required />

                <div className={'label'}>Comment</div>
                <textarea placeholder={'Your comment for the delivery...'} rows={8} onChange={handleCommentChange} value={comment} className={'input'} />

                <div className={'center'}>
                    <InlineButton
                        onClick={handleOrder}
                        text={'Order a card ('+process.env.NEXT_PUBLIC_CARD_COST + ' ' + process.env.NEXT_PUBLIC_CURRENCY_CODE +')'}
                    />
                </div>
            </div>
        </Layout>
    );
};

export default observer(Card);