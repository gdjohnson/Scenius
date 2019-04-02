import * as APIUtil from "../util/session_api_util";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const signUp = (user) => dispatch => {
    return APIUtil.signUp(user).then(
        user => dispatch({ type: RECEIVE_USER, user }), 
        errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
        );
};

export const signIn = (user) => dispatch => {
    return APIUtil.signIn(user).then(
        user => dispatch({type: RECEIVE_USER, user}), 
        errors => dispatch({type: RECEIVE_ERRORS, errors: errors.responseJSON})
    );
};

export const signOut = () => dispatch => {
    return APIUtil.signOut().then(
        () => dispatch({ type: REMOVE_USER }), 
        errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
    );
};
