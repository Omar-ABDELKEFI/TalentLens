import { quizConstants } from '@redux/actions/quiz';
const initialState = {
  loadingTesInfo : true ,
  loadingQuiz : true ,
  quiz : {
    questions: [],
  },
  testInfo : {
    questions: [],
  }
}

export function quiz(state =initialState, action: any) {
  switch (action.type) {
    case quizConstants.START_QUIZ_REQUEST:
      return {
        ...state,
        loadingTesInfo:action.loading
      };
    case quizConstants.START_QUIZ_SUCCESS:
      return {
        ...state,
        loadingTesInfo:action.loading,
        testInfo: action.testInfo
      };
    case quizConstants.START_QUIZ_FAILURE:
      return {error:action.error,loadingTesInfo:action.loading};

    case quizConstants.FETCH_QUIZ_REQUEST:
      return {
        ...state,
        loadingQuiz: true
      };
    case quizConstants.FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        loadingQuiz: false,
        quiz: action.quiz
      };
    case quizConstants.FETCH_QUIZ_FAILURE:
      return {
        ...state,
        loadingQuiz: false,
        error: action.error
      };

    case quizConstants.CREATE_RESULT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case quizConstants.CREATE_RESULT_SUCCESS:
      return {
        ...state,
        loading: false,
        testInfo: {...state.testInfo , test_status:action.result.test_status , score: action.result.score}
      };
    case quizConstants.CREATE_RESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case quizConstants.UPDATE_QUIZ_STATUS_REQUEST:
      return {
        ...state,
        loadingTesInfo: true
      };
    case quizConstants.UPDATE_QUIZ_STATUS_SUCCESS:
      return {
        ...state,
        loadingTesInfo: false,
        testInfo: {...state.testInfo,test_status:action.status}
      };
    case quizConstants.UPDATE_QUIZ_STATUS_FAILURE:
      return {
        ...state,
        loadingTesInfo: false,
        error: action.error
      };
    case quizConstants.UPDATE_CURRENT_QUESTION_REQUEST:
      return {
        ...state,
        loadingTesInfo: true
      };
    case quizConstants.UPDATE_CURRENT_QUESTION_SUCCESS:
      return {
        ...state,
        loadingTesInfo: false,
        testInfo: {...state.testInfo,current_question:action.current_question}
      };
    case quizConstants.UPDATE_CURRENT_QUESTION_REQUEST:
      return {
        ...state,
        loadingTesInfo: false,
        error: action.error
      };

    default:
      return state;
  }
}
