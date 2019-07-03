import React from 'react';
import SearchContainer from './search_container';
import UserControlContainer from './user_control_container';
import { Link } from 'react-router-dom';

class Header extends React.Component {    
    render (){
        return (
            <div className="header">
                <div className="header__left">
                    <SearchContainer  />
                    <Link to="/" className="button--home">Scenius</Link>
                </div>
                <div className="header__right">
                    <div className="button button--git"><a href="https://github.com/gdjohnson/Scenius" target="_blank"><i className="fab fa-github">&nbsp;&nbsp;</i>GH Repo</a></div>
                    <UserControlContainer />
                </div>
            </div>            
        );
    }
};

export default Header;