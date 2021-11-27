import service from '@service/test-api';
import { history } from '@redux/store';
import { Ichoice } from '../../types';

// question action types
export const questionsConstants = {
  CREATE_QUESTION_REQUEST: 'CREATE_QUESTION_REQUEST',
  CREATE_QUESTION_SUCCESS: 'CREATE_QUESTION_SUCCESS',
  CREATE_QUESTION_FAILURE: 'CREATE_QUESTION_FAILURE',
  //
  FETCH_QUESTIONS_REQUEST: 'FETCH_QUESTIONS_REQUEST',
  FETCH_QUESTIONS_SUCCESS: 'FETCH_QUESTIONS_SUCCESS',
  FETCH_QUESTIONS_FAILURE: 'FETCH_QUESTIONS_FAILURE'
  //
};

// action create question
export function createQuestion(question: any) {
  return (dispatch: any, getState: any) => {
    dispatch(request());
    const apiQuestion = JSON.parse(JSON.stringify(question));
    apiQuestion.choices.forEach((choice: Ichoice) => delete choice.id);
    service.baseApiParams.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    service.questions.editCreate(apiQuestion).then(
      () => {
        dispatch(success(undefined));
        console.log('Question created successfully');
        console.log(getState().test.testID, 'getState:anygetState:any');
        if (getState().test.testID) {
          history.goBack();
        } else {
          history.push('/questions');
        }
      },
      (data: any) => {
        if (data.error.error === 'token invalid') {
          history.push('/403');
        }
        console.log(data, 'data createQuestion');
        dispatch(failure(data.error.errors, data.error.error, data));
      }
    );
  };

  function request() {
    return { type: questionsConstants.CREATE_QUESTION_REQUEST };
  }

  function success(dataError: any) {
    return { type: questionsConstants.CREATE_QUESTION_SUCCESS, dataError };
  }

  function failure(error: any, tokenError: any, dataError: any) {
    return { type: questionsConstants.CREATE_QUESTION_FAILURE, error: error, tokenError: tokenError, dataError };
  }
}

//action get  questions
export function getQuestions() {
  return (dispatch: any) => {
    service.baseApiParams.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    dispatch(request());
    service.questions.questionsList().then(
      (questions: any) => {
        dispatch(success(questions.data.data));
      },
      (data: any) => {
        console.log(data.error.errors, 'errors getQuestions ');
        if (data.error.error === 'token invalid') {
          history.push('/403');
        }
        dispatch(failure(data.error.errors, data.error.error));
      }
    );
  };

  function request() {
    return { type: questionsConstants.FETCH_QUESTIONS_REQUEST };
  }

  function success(questions: any) {
    return { type: questionsConstants.FETCH_QUESTIONS_SUCCESS, questions: questions };
  }

  function failure(error: any, tokenError: any) {
    return { type: questionsConstants.FETCH_QUESTIONS_FAILURE, error: error, tokenError: tokenError };
  }
}
export function updateQuestion(questionId :any ,question: any) {
  return (dispatch: any,getState:any) => {
    dispatch(request());
    const apiQuestion = JSON.parse(JSON.stringify(question));
    apiQuestion.choices.forEach((choice:Ichoice) => delete choice.id);
    service.baseApiParams.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    service.questions.editCreate2(questionId,apiQuestion).then(
      () => {
        dispatch(success(undefined));
          history.push("/questions")
      },
      (data: any) => {
        if(data.error.error==="token invalid"){
          history.push("/403")
        }
        console.log(data,"ssssssssssss");
        dispatch(failure(data.error.errors,data.error.error,data));
      }
    );
  };

  function request() {
    return { type: questionsConstants.CREATE_QUESTION_REQUEST };
  }

  function success(dataError:any) {
    return { type: questionsConstants.CREATE_QUESTION_SUCCESS,dataError};
  }

  function failure(error: any,tokenError:any,dataError:any) {
    return { type: questionsConstants.CREATE_QUESTION_FAILURE, error: error,tokenError:tokenError,dataError};
  }
}
