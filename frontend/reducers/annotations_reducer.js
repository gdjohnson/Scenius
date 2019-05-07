import { RECEIVE_ANNOTATION, RECEIVE_ANNOTATIONS, DESTROY_ANNOTATION } from '../actions/annotation_actions';
import { RECEIVE_TRACK } from '../actions/track_actions';
import { RECEIVE_USER } from '../actions/session_actions';


const annotationsReducer = (state = {}, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_ANNOTATION:
      return state.concat(action.annotation);
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
    case DESTROY_ANNOTATION:
      const newState = {...state};
      if (newState.values) { return newState.filter(anno => anno.id !== action.annotation.id) };
    default:
      return state;
  }
};

export default annotationsReducer;