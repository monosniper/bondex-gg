import React, {useEffect, useState} from 'react';
import styles from "../styles/pages/Login.module.scss";
import InlineButton from "../components/InlineButton";
import {useRouter} from "next/router";
import store from "../store/store";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleLogin = () => {
        store.login({email, password})
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.title}>
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </div>

                <div className={'label'}>E-mail</div>
                <input type="email" placeholder={'E-mail address'} name={'email'} value={email} onChange={handleEmailChange} className={'input'} required />

                <div className={'label'}>Password</div>
                <input type="password" placeholder={'Password'} name={'password'} value={password} onChange={handlePasswordChange} className={'input'} required />

                <div className={'center'}>
                    <InlineButton
                        text={'Login'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;