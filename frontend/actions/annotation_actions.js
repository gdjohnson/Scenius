import * as APIUtil from '../util/annotation_api_util';

export const RECEIVE_ANNOTATIONS = 'RECEIVE_ANNOTATIONS';
export const RECEIVE_ANNOTATION = 'RECEIVE ANNOTATION';
export const RECEIVE_ERRORS = 'RECEIVE ERRORS';


export const createAnnotation = (annotation) => dispatch => {
    debugger
    return APIUtil.createAnnotation(annotation).then(
      annotation => dispatch({ type: RECEIVE_ANNOTATION, annotation }),
      errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
    );
  };
  
  export const fetchAnnotation = (id) => dispatch => {
    return APIUtil.fetchAnnotation(id).then(
      annotation =>{
        return dispatch({ type: RECEIVE_ANNOTATION, annotation });
      }, 
      errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
    );
  };
  
  export const fetchAnnotations = () => dispatch => {
    return APIUtil.fetchAnnotations().then(
      annotations => dispatch({ type: RECEIVE_ANNOTATIONS, annotations }),
      errors => dispatch({ type: RECEIVE_ERRORS, errors: errors.responseJSON })
    );
  };