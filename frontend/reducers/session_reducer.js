import { RECEIVE_USER, REMOVE_USER } from '../actions/session_actions';

export default (state = {}, action) => {
    Object.freeze(state);
    switch(action.type){
        case RECEIVE_USER:
            return {[action.user.id]: action.user}
        case REMOVE_USER:
            return {id: null};
        default:
            return state;
    }
}