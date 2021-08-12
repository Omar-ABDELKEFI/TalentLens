import service from '@service/test-api';
import {history} from "@redux/store";

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
  CREATE_TEST_QUESTION_REQUEST: 'CREATE_TEST_QUESTION_REQUEST',
  CREATE_TEST_QUESTION_SUCCESS: 'CREATE_TEST_QUESTION_SUCCESS',
  CREATE_TEST_QUESTION_FAILURE: 'CREATE_TEST_QUESTION_FAILURE',
  //
  REMOVE_TEST_QUESTION_REQUEST: 'REMOVE_TEST_QUESTION_REQUEST',
  REMOVE_TEST_QUESTION_SUCCESS: 'REMOVE_TEST_QUESTION_SUCCESS',
  REMOVE_TEST_QUESTION_FAILURE: 'REMOVE_TEST_QUESTION_FAILURE',
};
// action create question
export function createQuestion(question: any) {
  return (dispatch: any) => {
    dispatch(request());
    question.choices.forEach((choice:any) => delete choice.id);
    service.questions.editCreate(question).then(
      (question: any) => {
        dispatch(success());
        console.log('Question created successfully');
        history.goBack();
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
//action get  questions
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
//action add questions to test
export function addTestQuestions(question_id : number, test_id : string) {
  return (dispatch: any) => {
    dispatch(request());
    service.myTests.questionsCreate(test_id, {question_id:question_id})
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
// action remove question from test
export function removeTestQuestions(id : string, questionId : any ) {
  return (dispatch: any) => {
    dispatch(request());
    service.myTests.questionsDelete(id)
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
