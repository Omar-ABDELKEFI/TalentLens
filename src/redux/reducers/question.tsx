import { questionsConstants } from '@redux/actions/question';

// initialize state for question reduce
const initialState = {
  questions : []
}
// create question reducer
export function questions(state = initialState, action: any) {
  switch (action.type) {
    case questionsConstants.CREATE_QUESTION_REQUEST:
      return {
        ...state,
        loading: true
      };
    case questionsConstants.CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case questionsConstants.CREATE_QUESTION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case questionsConstants.FETCH_QUESTIONS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case questionsConstants.FETCH_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false ,
        questions: action.questions
      };
    case questionsConstants.FETCH_QUESTIONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
