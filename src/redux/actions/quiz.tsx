import service from '@service/test-api';

export const quizConstants = {

  START_QUIZ_REQUEST: 'START_QUIZ_REQUEST',
  START_QUIZ_SUCCESS: 'START_QUIZ_SUCCESS',
  START_QUIZ_FAILURE: 'START_QUIZ_FAILURE',

  FETCH_QUIZ_REQUEST: 'FETCH_QUIZ_REQUEST',
  FETCH_QUIZ_SUCCESS: 'FETCH_QUIZ_SUCCESS',
  FETCH_QUIZ_FAILURE: 'FETCH_QUIZ_FAILURE',

  CREATE_RESULT_REQUEST: 'CREATE_RESULT_REQUEST',
  CREATE_RESULT_SUCCESS: 'CREATE_RESULT_SUCCESS',
  CREATE_RESULT_FAILURE: 'CREATE_RESULT_FAILURE',

  UPDATE_QUIZ_STATUS_REQUEST: 'UPDATE_QUIZ_STATUS_REQUEST',
  UPDATE_QUIZ_STATUS_SUCCESS: 'UPDATE_QUIZ_STATUS_SUCCESS',
  UPDATE_QUIZ_STATUS_FAILURE: 'UPDATE_QUIZ_STATUS_FAILURE',

  UPDATE_CURRENT_QUESTION_REQUEST: 'UPDATE_CURRENT_QUESTION_REQUEST',
  UPDATE_CURRENT_QUESTION_SUCCESS: 'UPDATE_CURRENT_QUESTION_SUCCESS',
  UPDATE_CURRENT_QUESTION_FAILURE: 'UPDATE_CURRENT_QUESTION_FAILURE'

};

export function startQuiz(idTestCandidate: any) {
  return (dispatch: any) => {
    dispatch(request(true));

    service.startTest.startTest(idTestCandidate)
      .then(
        (res: any) => {
          dispatch(success(res.data.data, false));
        },
        (res: any) => {
          dispatch(failure(res.error, false));
        }
      );
  };

  function request(loading: boolean) {
    return { loading, type: quizConstants.START_QUIZ_REQUEST };
  }

  function success(testInfo: any, loading: boolean) {
    return { testInfo, loading, type: quizConstants.START_QUIZ_SUCCESS };
  }

  function failure(error: any, loading: boolean) {
    return { error, loading, type: quizConstants.START_QUIZ_FAILURE };
  }
}


export function getQuiz(idTestCandidate: any) {
  return (dispatch: any) => {
    dispatch(request());
    service.quiz.quizDetail(idTestCandidate).then(
      (res: any) => {
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

export function createResult(idTestCandidate: any) {
  return (dispatch: any) => {
    dispatch(request());
    service.score.scoreCreate(idTestCandidate).then(
      (res: any) => {
        console.log(res.data.data,"testtestgg");
        dispatch(success(res.data.data));
      },
      (error: any) => {
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

export function updateTestStatus(idTestCandidate: any, testStatus: any) {
  return (dispatch: any) => {
    dispatch(request());
    service.quiz.statusPartialUpdate(idTestCandidate, testStatus).then(
      (res: any) => {
        dispatch(success(res.data.data));
        console.log(Date.now(), ' status dates ');
        console.log(res.data.data.updated_at, ' updated at');

      },
      (error: any) => {
        dispatch(failure(error));
      }
    );

  };

  function request() {
    return { type: quizConstants.UPDATE_QUIZ_STATUS_REQUEST };
  }

  function success(status: any) {
    return { type: quizConstants.UPDATE_QUIZ_STATUS_SUCCESS, payload: status };
  }

  function failure(error: any) {
    return { type: quizConstants.UPDATE_QUIZ_STATUS_FAILURE, error: error };
  }
}

export function updateCurrentQuestion(idTestCandidate: any, currentQuestion: any) {
  return (dispatch: any) => {
    dispatch(request());
    service.quiz.currentQuestionPartialUpdate(idTestCandidate, currentQuestion).then(
      (res: any) => {
        dispatch(success(res.data.data));
      },
      (error: any) => {
        dispatch(failure(error));
      }
    );

  };

  function request() {
    return { type: quizConstants.UPDATE_CURRENT_QUESTION_REQUEST };
  }

  function success(payload: any) {
    return { type: quizConstants.UPDATE_CURRENT_QUESTION_SUCCESS, payload: payload };
  }

  function failure(error: any) {
    return { type: quizConstants.UPDATE_CURRENT_QUESTION_FAILURE, error: error };
  }
}

