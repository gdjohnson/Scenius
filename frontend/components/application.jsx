import React from 'react';
import { Route } from 'react-router-dom';
import Header from './header/header';
import AuthModal from './header/auth_modal';
import NewTrackFormContainer from './tracks/new_track_form_container';

const Application = () => {
    return(
        <div>
            <AuthModal />
            <Route path="/" component={Header}/>
            <div id="main">
                <Route path="/add" component={NewTrackFormContainer} />
                    {/* <Route exact path="/" component={Home}/>
                <Route path="/" component={Footer}/> */}
            </div>
            
        </div>
    )
}

export default Application;