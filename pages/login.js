import React, {useEffect, useState} from 'react';
import styles from "../styles/pages/Login.module.scss";
import InlineButton from "../components/InlineButton";
import {useRouter} from "next/router";
import store from "../store/store";
import Link from "next/link";
import {$routes} from "../http/routes";
import Noty from "noty";

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleLogin = () => {
        store.login({email, password}).then(rs => {
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
                router.push($routes.index)
            }
        })
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

                <div className={'center ' + styles.footer}>
                    <InlineButton
                        onClick={handleLogin}
                        text={'Login'}
                    />
                    <Link href={$routes.register}>
                        Register
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;