import React, {useEffect, useState} from 'react';
import styles from "../styles/pages/Login.module.scss";
import InlineButton from "../components/InlineButton";
import {useRouter} from "next/router";
import store from "../store/store";

const Login = () => {
    const [username, setEmail] = useState('')
    const [email, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ref, setRef] = useState(null)
    const router = useRouter()

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleUsernameChange = (e) => setUsername(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)

    const handleRegister = () => {
        store.register({email, password, ref})
    }

    useEffect(() => {
        if(router.query.ref) {
            setRef(router.query.ref)
        }
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.title}>
                    {process.env.NEXT_PUBLIC_APP_NAME}
                </div>

                <div className={'label'}>E-mail</div>
                <input type="email" placeholder={'E-mail address'} name={'email'} value={email} onChange={handleEmailChange} className={'input'} required />

                <div className={'label'}>Username</div>
                <input type="text" placeholder={'Username'} name={'username'} value={username} onChange={handleUsernameChange} className={'input'} required />

                <div className={'label'}>Password</div>
                <input type="password" placeholder={'Password'} name={'password'} value={password} onChange={handlePasswordChange} className={'input'} required />

                <div className={'center'}>
                    <InlineButton
                        onClick={handleRegister}
                        text={'Register'}
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;