import * as APIUtil from "../util/session_api_util";

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const sign_up = (user) => dispatch => {
    return APIUtil.sign_up(user).then(
        (user) => dispatch({ type: RECEIVE_USER, user }), errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
    )
}

export const sign_in = (user) => dispatch => {
    return APIUtil.sign_in(user).then(
        user => dispatch({type: RECEIVE_USER, user}), errors => dispatch({type: RECEIVE_ERRORS, errors: errors.responseJSON}))
}

export const sign_out = () => dispatch => {
    return APIUtil.sign_out().then(
        (user) => dispatch({ type: REMOVE_USER }), errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
    )
}
