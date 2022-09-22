import React from 'react';
import {useTranslation} from "next-i18next";

const Loading = () => {
    const { t, i18n } = useTranslation();

    return (
        <div>
            {t('loading')}
        </div>
    );
};

export default Loading;