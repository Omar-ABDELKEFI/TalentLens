import service from '@service/test-api';
import {history} from "@redux/store";
import { Ichoice } from '../../types';

// question action types
export const questionsConstants = {
  CREATE_QUESTION_REQUEST: 'CREATE_QUESTION_REQUEST',
  CREATE_QUESTION_SUCCESS: 'CREATE_QUESTION_SUCCESS',
  CREATE_QUESTION_FAILURE: 'CREATE_QUESTION_FAILURE',
  //
  FETCH_QUESTIONS_REQUEST: 'FETCH_QUESTIONS_REQUEST',
  FETCH_QUESTIONS_SUCCESS: 'FETCH_QUESTIONS_SUCCESS',
  FETCH_QUESTIONS_FAILURE: 'FETCH_QUESTIONS_FAILURE',
  //
};
// action create question
export function createQuestion(question: any) {
  return (dispatch: any) => {
    dispatch(request());
    const apiQuestion = JSON.parse(JSON.stringify(question));
    apiQuestion.choices.forEach((choice:Ichoice) => delete choice.id);
    service.questions.editCreate(apiQuestion).then(
      () => {
        dispatch(success());
        console.log('Question created successfully');
        history.goBack();
      },
      (data: any) => {
        console.log(data.error.errors,"errorerror");
        dispatch(failure(data.error.errors));
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
//action get  questions
export function getQuestions() {
  return (dispatch: any) => {
    dispatch(request());
    service.questions.questionsList().then(
      (questions: any) => {
        dispatch(success(questions.data.data));
      },
      (data: any) => {
        console.log(data.error.errors,"errorerror");
        dispatch(failure(data.error.errors));
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
