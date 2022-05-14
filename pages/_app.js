import '../styles/globals.scss'
import store from "../store/store";
import {useEffect, useState} from "react";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import {$routes} from "../http/routes";
import {useRouter} from "next/router";
import {observer} from "mobx-react-lite";

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    store.checkAuth().then(() => {
      setIsLoading(false)
      console.log({...store.user})
    })
  }, [])

  return isLoading ? <p>loading</p> : <Component {...pageProps} />
}

export default MyApp
