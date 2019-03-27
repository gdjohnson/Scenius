import React from 'react';
import { Link } from 'react-router-dom';
import UserDrop from './user_drop';

const UserControl = ({ currentUser, signOut }) => {
    const CurrentUser = () => {
        return (
            <div>
                <h3>{currentUser.username}</h3>
                <button onClick={signOut}>Sign Out</button>
                <UserDrop />
            </div>
        )
    }

    const NoUser = () => {
        return (
            <div>
                <Link to='/signin'>Sign In</Link><br />
                <Link to='/signup'>Sign Up</Link>
            </div>
        )
    }

    return currentUser ? CurrentUser() : NoUser();
}

export default UserControl;