import React from 'react';
import SearchContainer from './search_container';
import UserControlContainer from './user_control_container';
import { Link } from 'react-router-dom';

class Header extends React.Component {    
    render (){
        return (
            <div className="header">
                <SearchContainer  />
                <div className="button button--git"><a href="https://github.com/gdjohnson/Scenius" target="_blank"><i className="fab fa-github">&nbsp;&nbsp;</i>GH Repo</a></div>
                <Link to="/" className="button--home">Scenius</Link>
                <UserControlContainer />
            </div>            
        );
    }
};

export default Header;