import '../styles/globals.scss'
import store from "../store/store";
import {useEffect, useState} from "react";
import i18n from 'i18next';
import '../utils/i18n';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    store.checkAuth().then(() => {
      setIsLoading(false)
      // i18n.changeLanguage(store.user.lang)
      i18n.changeLanguage('en')
    })
  }, [])

  return isLoading ? <p>loading</p> : <Component {...pageProps} />
}

export default MyApp
