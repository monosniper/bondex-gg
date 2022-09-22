import React from 'react';
import {useTranslation} from "next-i18next";
import Layout from "../components/Layout";
import styles from "../styles/pages/Edit.module.scss";
import AwesomeSlider from "react-awesome-slider";
import store from "../store/store";
import Button from "../components/Button";

const Investment = () => {
    const { t, i18n } = useTranslation();

    return (
        <Layout>
            <div className={styles.wrapper}>
                <AwesomeSlider
                    style={{height:520,marginBottom: '1rem'}}
                    bullets={false}
                >
                    {[1,2,3].map(i => (
                        <div key={'img-'+i} className={'slide'}>
                            <img style={{height: '100%'}} src={`/assets/img/invest/${i18n.language}/${i}.png`} alt={i} />
                        </div>
                    ))}
                </AwesomeSlider>
                <Button
                    onClick={() => store.setDepositModal(true)}
                    text={t('investment')}
                />
            </div>
        </Layout>
    );
};

export default Investment;