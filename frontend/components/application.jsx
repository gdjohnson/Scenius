import React from 'react';
import { Route } from 'react-router-dom';
import Header from './header/header';
import AuthModal from './header/auth_modal';

const Application = () => {
    return(
        <div>
            <AuthModal />
            <Route path="/" component={Header}/>
                {/* <Route exact path="/" component={Home}/>
            <Route path="/" component={Footer}/> */}
        </div>
    )
}

export default Application;