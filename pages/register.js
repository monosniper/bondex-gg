import React, {useEffect, useState} from 'react';
import styles from "../styles/pages/Login.module.scss";
import InlineButton from "../components/InlineButton";
import {useRouter} from "next/router";
import store from "../store/store";
import Link from "next/link";
import {$routes} from "../http/routes";
import Noty from 'noty'

const Login = () => {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [ref, setRef] = useState(null)
    const router = useRouter()

    const handleEmailChange = (e) => setEmail(e.target.value)
    const handleNameChange = (e) => setName(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handlePasswordAgainChange = (e) => setPasswordAgain(e.target.value)

    const handleRegister = () => {
        if(password !== passwordAgain) {
            new Noty({
                theme: 'sunset',
                type: 'error',
                text: 'Passwords are not equal!',
            }).show()
        } else if(name === '') {
            new Noty({
                theme: 'sunset',
                type: 'error',
                text: 'The name field is required!',
            }).show()
        } else {
            store.register({email, name, password, ref}).then(rs => {
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

                <div className={'label'}>Full name</div>
                <input type="text" placeholder={'Full name'} name={'name'} value={name} onChange={handleNameChange} className={'input'} required />

                <div className={'label'}>Password</div>
                <input type="password" placeholder={'Password'} name={'password'} value={password} onChange={handlePasswordChange} className={'input'} required />

                <div className={'label'}>Password again</div>
                <input type="password" placeholder={'Password again'} name={'password_confirmation'} value={passwordAgain} onChange={handlePasswordAgainChange} className={'input'} required />

                <div className={'center ' + styles.footer}>
                    <InlineButton
                        onClick={handleRegister}
                        text={'Register'}
                    />
                    <Link href={$routes.login}>
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;