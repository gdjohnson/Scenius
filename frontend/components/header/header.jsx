import React from 'react';
import UserControlContainer from './user_control_container';

class Header extends React.Component {
    render (){
        return (
            <div className="header">
                <div className="search">MockSearch</div>
                <h1 className="header-title">Scenius</h1>
                <div className="logo"></div>
                <UserControlContainer />
            </div>
            
        );
    }
};

export default Header;