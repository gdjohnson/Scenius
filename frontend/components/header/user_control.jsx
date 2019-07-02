import React from 'react';
import { Link } from 'react-router-dom';

const UserControl = ({currentUser, openModal, signOut}) => {
    const signedIn = () => {
        return (
            <div className="user-control">
                <button className="nav-button nav-button--user"><Link to="/add">Add Track</Link></button>
                {/* <h3 className="nav-button nav-button--user">{currentUser.username}</h3> */}
                <button className="nav-button nav-button--user" onClick={signOut}>Sign Out</button>
            </div>
        )
    }

    const signedOut = () => {
        return (
            <div className="user-control">
                <button className="nav-button nav-button--user" 
                        onClick={() => openModal({modal: 'signin'})}>
                        Sign In
                </button>
                <button className="nav-button nav-button--user" 
                        onClick={() => openModal({modal: 'signup'})}>
                        Sign Up
                </button>
            </div>
        )
    }

    return currentUser ? signedIn() : signedOut();
}

export default UserControl;