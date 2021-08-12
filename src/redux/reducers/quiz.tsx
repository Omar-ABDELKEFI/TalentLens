import { quizConstants } from '@redux/actions/quiz';
const initialState = {
  loading : false ,
  quiz : {
    questions: []
  }
}
export function quiz(state =initialState, action: any) {
  switch (action.type) {
    case quizConstants.FETCH_QUIZ_REQUEST:
      return {
        ...state,
        loading: true
      };
    case quizConstants.FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loading: false,
        quiz: action.quiz
      };
    case quizConstants.FETCH_QUIZ_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
