import service from '@service/test-api';

export const quizConstants = {
  FETCH_QUIZ_REQUEST: 'FETCH_QUIZ_REQUEST',
  FETCH_QUIZ_SUCCESS: 'FETCH_QUIZ_SUCCESS',
  FETCH_QUIZ_FAILURE: 'FETCH_QUIZ_FAILURE',
};
export function getQuiz(testId : any) {
  return (dispatch: any) => {
    dispatch(request());
    service.quiz.quizList({testID: testId }).then(
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

