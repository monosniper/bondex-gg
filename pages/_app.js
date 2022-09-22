import '../styles/globals.scss'
import store from "../store/store";
import {useEffect, useState} from "react";
import i18n from 'i18next';
import '../utils/i18n';
import Cookies from 'js-cookie'
import DepositModal from "../components/depositModal";
import 'react-awesome-slider/src/core/styles.scss';

function MyApp({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    store.checkAuth().then(() => {
      setIsLoading(false)
      // i18n.changeLanguage(store.user.lang)
      const lang = Cookies.get('lang');
      i18n.changeLanguage( lang ? lang : 'en')
    })
  }, [])

  return isLoading ? <p>loading</p> : <>
    <Component {...pageProps} />
    <DepositModal />
  </>
}

export default MyApp
