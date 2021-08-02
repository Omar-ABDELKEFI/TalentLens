import service from '../../service/test-api';

export const questionsConstants = {
  CREATE_QUESTION_REQUEST: 'CREATE_QUESTION_REQUEST',
  CREATE_QUESTION_SUCCESS: 'CREATE_QUESTION_SUCCESS',
  CREATE_QUESTION_FAILURE: 'CREATE_QUESTION_FAILURE',
  //
  FETCH_QUESTIONS_REQUEST: 'FETCH_QUESTIONS_REQUEST',
  FETCH_QUESTIONS_SUCCESS: 'FETCH_QUESTIONS_SUCCESS',
  FETCH_QUESTIONS_FAILURE: 'FETCH_QUESTIONS_FAILURE',
  //
  CREATE_TEST_QUESTION_REQUEST: 'CREATE_TEST_QUESTION_REQUEST',
  CREATE_TEST_QUESTION_SUCCESS: 'CREATE_TEST_QUESTION_SUCCESS',
  CREATE_TEST_QUESTION_FAILURE: 'CREATE_TEST_QUESTION_FAILURE',
  //
  REMOVE_TEST_QUESTION_REQUEST: 'REMOVE_TEST_QUESTION_REQUEST',
  REMOVE_TEST_QUESTION_SUCCESS: 'REMOVE_TEST_QUESTION_SUCCESS',
  REMOVE_TEST_QUESTION_FAILURE: 'REMOVE_TEST_QUESTION_FAILURE',
};

export function createQuestion(question: any) {
  return (dispatch: any) => {
    dispatch(request());
    service.questions.editCreate(question).then(
      (question: any) => {
        dispatch(success());
        console.log('question ,', question.data.data);
      },
      (error: any) => {
        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: questionsConstants.CREATE_QUESTION_REQUEST };
  }

  function success() {
    return { type: questionsConstants.CREATE_QUESTION_SUCCESS };
  }

  function failure(error: any) {
    return { type: questionsConstants.CREATE_QUESTION_FAILURE, error: error };
  }
}
export function getQuestions() {
  return (dispatch: any) => {
    dispatch(request());
    service.questions.questionsList().then(
      (questions: any) => {
        dispatch(success(questions.data.data));
        console.log('question ,', questions);
      },
      (error: any) => {
        dispatch(failure(error));
      }
    );
  };
  function request() {
    return { type: questionsConstants.FETCH_QUESTIONS_REQUEST };
  }
  function success(questions: any) {
    return { type: questionsConstants.FETCH_QUESTIONS_SUCCESS, questions: questions };
  }
  function failure(error: any) {
    return { type: questionsConstants.FETCH_QUESTIONS_FAILURE, error: error };
  }
}

export function addTestQuestions(question_id : number, test_id : string) {
  return (dispatch: any) => {
    dispatch(request());
    service.myTests.idQuestionsCreate(test_id, {question_id:question_id})
        .then(
            (res: any) => {
              dispatch(success(res.data.data))
            },
            (res: any) => {
              dispatch(failure(res.error.toString()));
              console.log(res.error.toString())
            }
        );
  };

  function request() {
    return {type: questionsConstants.CREATE_TEST_QUESTION_REQUEST};
  }

  function success(test_question:any) {
    return {type: questionsConstants.CREATE_TEST_QUESTION_SUCCESS,test_question:test_question}
  }

  function failure(error: any) {
    return {type: questionsConstants.CREATE_TEST_QUESTION_FAILURE, error}
  }
}
export function removeTestQuestions(id : string, questionId : any ) {
  return (dispatch: any) => {
    dispatch(request());
    service.myTests.questionsIdDelete(id)
        .then(
            (res: any) => {
              dispatch(success(id , questionId))
              console.log(res, "dataa")
            },
            (res: any) => {
              dispatch(failure(res.error.toString()));
              console.log(res.error.toString())
            }
        );
  };

  function request() {
    return {type: questionsConstants.REMOVE_TEST_QUESTION_REQUEST};
  }

  function success(id:any , questionId :any) {
    return {type: questionsConstants.REMOVE_TEST_QUESTION_SUCCESS,test_question_id:id , questionId: questionId}
  }

  function failure(error: any) {
    return {type: questionsConstants.REMOVE_TEST_QUESTION_FAILURE, error}
  }
}
