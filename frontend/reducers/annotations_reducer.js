import { RECEIVE_ANNOTATION, RECEIVE_ANNOTATIONS } from '../actions/annotation_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/session_actions';


const annotationsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ANNOTATION:
      debugger
      return {... action.annotation};
    case RECEIVE_ANNOTATIONS:
      return action.annotations;
    case RECEIVE_TRACK:
      if (action.track.annotations){
        return action.track.annotations;
      }
    case RECEIVE_USER:
      if (action.user.annotations){
        return action.user.annotations;
      }
    default:
      return state;
  }
};

export default annotationsReducer;