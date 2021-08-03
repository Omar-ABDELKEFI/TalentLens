import { questionsConstants } from '@redux/actions/question';
import {testConstants} from "@redux/actions/tests";
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
    case questionsConstants.CREATE_TEST_QUESTION_REQUEST:
      return {
        ...state,
        loading : true
      }
    case questionsConstants.CREATE_TEST_QUESTION_SUCCESS:
      const newTestQuestion = state.questions.map((question:any)=>
        question.id === action.test_question.question_id ?
            {
                ...question , test_questions:[...question.test_questions,action.test_question]
            }:
           question
      )

      return {
        ...state,
        loading: false,
        questions: newTestQuestion
      }
    case questionsConstants.CREATE_TEST_QUESTION_FAILURE:
      return {
        ...state,
        error: action.error
      }
    case questionsConstants.REMOVE_TEST_QUESTION_REQUEST:
      return {
        ...state,
        loading : true
      }
    case questionsConstants.REMOVE_TEST_QUESTION_SUCCESS:
      const newQuestion = state.questions.map((question:any)=> {

            return(
                question.id === action.questionId ?

                {
                  ...question,
                  test_questions: question.test_questions.filter((testQuestion: any) => testQuestion.ID !== action.test_question_id)
                } :
                {
                    ...question
                })
          }
      )
      console.log("newQuestion",newQuestion)
      return {
        ...state,
        questions: newQuestion,
        loading: false
      }
    case questionsConstants.REMOVE_TEST_QUESTION_FAILURE:
      return {
        ...state,
        error: action.error
      }
    default:
      return state;
  }
}
