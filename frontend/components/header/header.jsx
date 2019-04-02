import React from 'react';
import Search from './search';
import UserControlContainer from './user_control_container';
import { Link } from 'react-router-dom';

class SubHeader extends React.Component {
    render (){
        return (
            <div className="subheader">
                <p>Featured</p>
                <p>Stories</p>
                <p>Top</p> 
                <p>Songs</p>
                <p>Videos</p>
                <p>Community Shop</p>
            </div>
        )
    }
}

class Header extends React.Component {

    
    render (){
        return (
            <div>
            <div className="header">
                <Search  />
                <Link to="/" className="header-title">Scenius</Link>
                <UserControlContainer />
            </div>
            <SubHeader />
            </div>
            
        );
    }
};

export default Header;