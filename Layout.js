import React from 'react';
import Header from "./components/Header";
import Normalizer from "./components/Normalizer";
import Navigation from "./components/Navigation";

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