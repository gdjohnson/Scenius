import React from 'react';
import Search from './search';
import UserControlContainer from './user_control_container';
import { Link } from 'react-router-dom';

class Header extends React.Component {
    render (){
        return (
            <div className="header">
                <Search  />
                <Link to="/" className="header-title">Scenius</Link>
                <div className="logo"></div>
                <UserControlContainer />
            </div>
            
        );
    }
};

export default Header;