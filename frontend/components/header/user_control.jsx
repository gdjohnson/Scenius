import React from 'react';
import UserDrop from './user_drop';

const UserControl = ({currentUser, openModal, signOut}) => {
    const signedIn = () => {
        return (
            <div className="user-control">
                <div className="user-drop">
                    <h3>{currentUser.username}</h3>
                    <UserDrop />
                </div>
                <button className="user-control-button" onClick={signOut}>Sign Out</button>
            </div>
        )
    }

    const signedOut = () => {
        return (
            <div className="user-control">
                <button className="user-control-button" onClick={() => openModal('signin')}>Sign In</button>
                <button className="user-control-button" onClick={() => openModal('signup')}>Sign Up</button>
            </div>
        )
    }

    return currentUser ? signedIn() : signedOut();
}

export default UserControl;