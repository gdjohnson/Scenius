import React from 'react';
import UserDrop from './user_drop';
import { Link } from 'react-router-dom';

const UserControl = ({currentUser, openModal, signOut}) => {
    const signedIn = () => {
        return (
            <div className="user-control">
                <Link to="/add" className="user-control-button">Add Track</Link>
                <h3 className="user-control-button">{currentUser.username}</h3>
                <button className="user-control-button" onClick={signOut}>Sign Out</button>
            </div>
        )
    }

    const signedOut = () => {
        return (
            <div className="user-control">
                <button className="user-control-button" onClick={() => openModal({modal: 'signin'})}>Sign In</button>
                <button className="user-control-button" onClick={() => openModal({modal: 'signup'})}>Sign Up</button>
            </div>
        )
    }

    return currentUser ? signedIn() : signedOut();
}

export default UserControl;