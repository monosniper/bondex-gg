import '../styles/globals.scss'
import store from "../store/store";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store.checkAuth()
  }, [])

  return <Component {...pageProps} />
}

export default observer(MyApp)
