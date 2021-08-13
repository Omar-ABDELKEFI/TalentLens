import service from '@service/test-api';
import { history } from '@redux/store';

export const quizConstants = {
  FETCH_QUIZ_REQUEST: 'FETCH_QUIZ_REQUEST',
  FETCH_QUIZ_SUCCESS: 'FETCH_QUIZ_SUCCESS',
  FETCH_QUIZ_FAILURE: 'FETCH_QUIZ_FAILURE',

  CREATE_RESULT_REQUEST:'CREATE_RESULT_REQUEST',
  CREATE_RESULT_SUCCESS:'CREATE_RESULT_SUCCESS',
  CREATE_RESULT_FAILURE:'CREATE_RESULT_FAILURE'
};
export function getQuiz(idTestCandidate : any) {
  return (dispatch: any) => {
    dispatch(request());
    service.quiz.quizDetail(idTestCandidate).then(
      (res: any) => {
        console.log(res.data.data, 'dataa');
        dispatch(success(res.data.data));
      },
      (error: any) => {
        dispatch(failure(error));
      }
    );

  };

  function request() {
    return { type: quizConstants.FETCH_QUIZ_REQUEST };
  }

  function success(quiz: any) {
    return { type: quizConstants.FETCH_QUIZ_SUCCESS, quiz: quiz };
  }

  function failure(error: any) {
    return { type: quizConstants.FETCH_QUIZ_FAILURE, error: error };
  }
}
export function createResult(idTestCandidate : any) {
  return (dispatch: any) => {
    dispatch(request());
    service.score.scoreCreate(idTestCandidate).then(
      (res: any)=>{
        dispatch(success(res.data.data));
        console.log(res,"resultttttt");
        history.push("/quiz/finish")
      },
      (error:any)=>{
        dispatch(failure(error));
      }
    );

  };

  function request() {
    return { type: quizConstants.CREATE_RESULT_REQUEST };
  }

  function success(result: any) {
    return { type: quizConstants.CREATE_RESULT_SUCCESS, result: result };
  }

  function failure(error: any) {
    return { type: quizConstants.FETCH_QUIZ_FAILURE, error: error };
  }
}

