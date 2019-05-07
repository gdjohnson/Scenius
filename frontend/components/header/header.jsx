import React from 'react';
import SearchContainer from './search_container';
import UserControlContainer from './user_control_container';
import { Link } from 'react-router-dom';

class SubHeader extends React.Component {
    render (){
        return (
            <div className="subheader">
                <Link to="/">Recent Tracks</Link>
                <a href="https://github.com/gdjohnson/Scenius" target="_blank">Github Repo</a>
            </div>
        )
    }
}

class Header extends React.Component {

    
    render (){
        return (
            <div>
            <div className="header">
                <SearchContainer  />
                <Link to="/" className="header-title">Scenius</Link>
                <UserControlContainer />
            </div>
            <SubHeader />
            </div>
            
        );c
    }
};

export default Header;