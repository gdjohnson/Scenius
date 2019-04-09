import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Header from './header/header';
import Modal from './header/modal';
import TrackFormContainer from './tracks/track_form_container';
import TrackShowContainer from './tracks/track_show_container';
import AlphIndex from './tracks/alph_index';
import ArtistShow from './artist_show';
import AlbumShow from './album_show';
import HomePage from './home_page';
import Footer from './footer';


const Application = () => {
    return(
        <div>
            <Modal />
            <Route path="/" component={Header}/>
            <div id="main">
                <Route exact path="/" component={HomePage} />
                <Route exact path="/add" component={TrackFormContainer} />
                <Route exact path="/tracks/:id" component={TrackShowContainer}/>
                <Route exact path="/artists/:char" component={AlphIndex}/>
                <Route exact path="/artists/:char/:id" component={ArtistShow}/>
                <Route exact path="/albums/:id" component={AlbumShow}/>
                {/* <Route exact path="/artists/:char:/:id" component={ArtistShow} */}
            </div>
            <Route path="/" component={Footer}/>
            </div>
            );
}

export default Application;