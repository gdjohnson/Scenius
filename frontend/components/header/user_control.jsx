import React from 'react';
import { Link } from 'react-router-dom';

const UserControl = ({currentUser, openModal, signOut}) => {
    const signedIn = () => {
        return (
            <div className="user-control">
                <button className="button box-button box-button--user"><Link to="/add">Add Track</Link></button>
                {/* <h3 className="button box-button box-button--user">{currentUser.username}</h3> */}
                <button className="button box-button box-button--user" onClick={signOut}>Sign Out</button>
            </div>
        )
    }

    const signedOut = () => {
        return (
            <div className="user-control">
                <button className="button box-button box-button--user" 
                        onClick={() => openModal({modal: 'signin'})}>
                        Sign In
                </button>
                <button className="button box-button box-button--user" 
                        onClick={() => openModal({modal: 'signup'})}>
                        Sign Up
                </button>
            </div>
        )
    }

    return currentUser ? signedIn() : signedOut();
}

export default UserControl;