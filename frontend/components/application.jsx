import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './header/header';
import AuthModal from './header/auth_modal';
import NewTrackFormContainer from './tracks/new_track_form_container';
import TrackShowContainer from './tracks/track_show_container';
import AlphIndex from './tracks/alph-index';
import Footer from './footer';


const Application = () => {
    return(
        <div>
            <AuthModal />
            <Route path="/" component={Header}/>
            <div id="main">
                <Route exact path="/add" component={NewTrackFormContainer} />
                <Route exact path="/tracks/:id" component={TrackShowContainer}/>
                <Route exact path="/artists/:char" component={AlphIndex}/>
                {/* <Route exact path="/artists/:char:/:id" component={ArtistShow} */}
            </div>
            <Route path="/" component={Footer}/>
            </div>
            );
}

export default Application;