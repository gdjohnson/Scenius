import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './header/header';
import AuthModal from './header/auth_modal';
import TrackFormContainer from './track/track_form_container';
import TrackShowContainer from './track/track_show_container';
import AlphIndexContainer from './alph_index_container';
import ArtistShowContainer from './artist/artist_show_container';
import AlbumShowContainer from './album/album_show_container';
import HomePage from './home_page';
import Footer from './footer';


const Application = () => {
    return(
        <div>
            <AuthModal />
            <Route path="/" component={Header}/>
            <div id="main">
                <Route exact path="/" component={HomePage} />

                <Route exact path="/add" component={TrackFormContainer} />
                <Route exact path="/tracks/:id" component={TrackShowContainer}/>

                <Route exact path="/artists/:char" component={AlphIndexContainer}/>
                <Route exact path="/artists/:char/:id" component={ArtistShowContainer}/>
                <Route exact path="/albums/:id" component={AlbumShowContainer}/>
            </div>
            <Route path="/" component={Footer}/>
            </div>
            );
}

export default Application;