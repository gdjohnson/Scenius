import React from 'react';
import { Link } from 'react-router-dom';

const UserControl = ({currentUser, openModal, signOut}) => {
    const signedIn = () => {
        return (
            <div className="user-control">
                <button className="user-control-button"><Link to="/add">Add Track</Link></button>
                {/* <h3 className="user-control-button">{currentUser.username}</h3> */}
                <button className="user-control-button" onClick={signOut}>Sign Out</button>
            </div>
        )
    }

    const signedOut = () => {
        return (
            <div className="user-control">
                <button className="user-control-button" 
                        onClick={() => openModal({modal: 'signin'})}>
                        Sign In
                </button>
                <button className="user-control-button" 
                        onClick={() => openModal({modal: 'signup'})}>
                        Sign Up
                </button>
            </div>
        )
    }

    return currentUser ? signedIn() : signedOut();
}

export default UserControl;