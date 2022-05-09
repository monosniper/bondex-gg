import React from 'react';
import Header from "./Header";
import Normalizer from "./Normalizer";
import Navigation from "./Navigation";

const Layout = ({children}) => {
    return (
        <div>
            <Header/>
            <Normalizer size={'90px'}/>

            {children}

            <Normalizer size={'108px'}/>
            <Navigation/>
        </div>
    );
};

export default Layout;