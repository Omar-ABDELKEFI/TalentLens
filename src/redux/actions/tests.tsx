import React from 'react';
import service from '@service/test-api';
import { history } from '@redux/store';
import { ModelsCandidateRequest, ModelsTest } from '../../myApi';
// action test types
export const testConstants = {
  CREATE_TEST_REQUEST: 'CREATE_TEST_REQUEST',
  CREATE_TEST_SUCCESS: 'CREATE_TEST_SUCCESS',
  CREATE_TEST_FAILURE: 'CREATE_TEST_FAILURE',
  //
  UPDATE_TEST_REQUEST: 'UPDATE_TEST_REQUEST',
  UPDATE_TEST_SUCCESS: 'UPDATE_TEST_SUCCESS',
  UPDATE_TEST_FAILURE: 'UPDATE_TEST_FAILURE',
  //
  CREATE_CANDIDATE_REQUEST: 'CREATE_CANDIDATE_REQUEST',
  CREATE_CANDIDATE_SUCCESS: 'CREATE_CANDIDATE_SUCCESS',
  CREATE_CANDIDATE_FAILURE: 'CREATE_CANDIDATE_FAILURE',
  //
  UPDATE_CANDIDATE_REQUEST: 'UPDATE_CANDIDATE_REQUEST',
  UPDATE_CANDIDATE_SUCCESS: 'UPDATE_CANDIDATE_SUCCESS',
  UPDATE_CANDIDATE_FAILURE: 'UPDATE_CANDIDATE_FAILURE',
  //
  CREATE_TEST_QUESTION_REQUEST: 'CREATE_TEST_QUESTION_REQUEST',
  CREATE_TEST_QUESTION_SUCCESS: 'CREATE_TEST_QUESTION_SUCCESS',
  CREATE_TEST_QUESTION_FAILURE: 'CREATE_TEST_QUESTION_FAILURE',
  //
  REMOVE_TEST_QUESTION_REQUEST: 'REMOVE_TEST_QUESTION_REQUEST',
  REMOVE_TEST_QUESTION_SUCCESS: 'REMOVE_TEST_QUESTION_SUCCESS',
  REMOVE_TEST_QUESTION_FAILURE: 'REMOVE_TEST_QUESTION_FAILURE',
  //
  GET_MYTESTS_REQUEST: 'GET_MYTESTS_REQUEST',
  GET_MYTESTS_SUCCESS: 'GET_MYTESTS_SUCCESS',
  GET_MYTESTS_FAILURE: 'GET_MYTESTS_FAILURE',
  //
  SET_TIME_LIMIT: 'SET_TIME_LIMIT',
  //
  SET_CANDIDATE: 'SET_CANDIDATE',
  //
  REMOVE_ERROR: 'REMOVE_ERROR',
  //
  GET_TEST_REQUEST: 'GET_TEST_REQUEST',
  GET_TEST_SUCCESS: 'GET_TEST_SUCCESS',
  GET_TEST_FAILURE: 'GET_TEST_FAILURE',
  //
  CLONE_TEST_REQUEST: 'CLONE_TEST_REQUEST',
  CLONE_TEST_SUCCESS: 'CLONE_TEST_SUCCESS',
  CLONE_TEST_FAILURE: 'CLONE_TEST_FAILURE'
};

// action create test
export function createTest() {
  return (dispatch: any) => {
    dispatch(request(true));
    service.baseApiParams.headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    service.myTests
      .myTestsCreate({
        passing_score: 50,
        name: 'test tekab',
        show_score: false,
        timing_policy: 'Medium',
        time_limit: 3
      }) // id create automatically
      .then(
        (res: any) => {
          dispatch(success(false, res.data.test.ID));
          history.push(`/my-tests/${res.data.test.ID}`);
        },
        (res: any) => {
          if (res.error.error === 'token invalid') {
            history.push('/403');
          }

          dispatch(failure(res.error.error, false));
        }
      );
  };

  function request(loading: boolean) {
    return { loading, type: testConstants.CREATE_TEST_REQUEST };
  }

  function success(loading: boolean, testID: any) {
    return { loading, testID, type: testConstants.CREATE_TEST_SUCCESS };
  }

  function failure(error: string, loading: boolean) {
    return { error, loading, type: testConstants.CREATE_TEST_FAILURE };
  }
}

// action update test
export function updateTest(testId: number, test: ModelsTest) {
  return (dispatch: any) => {
    dispatch(request(true));
    service.baseApiParams.headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    service.myTests.updateTest(testId, test).then(
      (res: any) => {
        dispatch(success(test, false));
        console.log(res, 'res updateTest');
      },
      (res: any) => {
        if (res.error.error === 'token invalid') {
          history.push('/403');
        }
        dispatch(failure(res.error.error.toString(), false));
      }
    );
  };

  function request(loading: boolean) {
    return { loading, type: testConstants.UPDATE_TEST_REQUEST };
  }

  function success(test: ModelsTest, loading: boolean) {
    return { test, loading, type: testConstants.UPDATE_TEST_SUCCESS };
  }

  function failure(error: string, loading: boolean) {
    return { error, loading, type: testConstants.UPDATE_TEST_FAILURE };
  }
}

// action create candidate
export function create_candidate(candidate: ModelsCandidateRequest[]) {
  return (dispatch: any) => {
    dispatch(request(true));
    service.baseApiParams.headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    service.candidate.candidateCreate(candidate).then(
      () => {
        dispatch(success(candidate, false, []));
      },
      (res: any) => {
        if (res.error.error === 'token invalid') {
          history.push('/403');
        }
        console.log(res, 'res create_candidate ');
        dispatch(failure(res.error.emailsDuplicate, true));
      }
    );
  };

  function request(loading: boolean) {
    return { loading, type: testConstants.CREATE_CANDIDATE_REQUEST };
  }

  function success(candidate: ModelsCandidateRequest[], loading: boolean, error: any) {
    return { error, candidate, loading, type: testConstants.CREATE_CANDIDATE_SUCCESS };
  }

  function failure(error: string, loading: boolean) {
    return { error, loading, type: testConstants.CREATE_CANDIDATE_FAILURE };
  }
}

export function getMyTests() {
  return async (dispatch: any) => {
    dispatch(request(true));
    service.baseApiParams.headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    console.log(service.baseApiParams.headers, 'service.baseApiParams.headers');
    try {
      const res: any = await service.myTests.getMyTests();

      dispatch(success(res.data.test, false));
    } catch (e) {
      if (e.error.error === 'token invalid') {
        history.push('/403');
      }
      dispatch(failure(e.error.error, false));
    }
  };

  function request(loading: boolean) {
    return { loading, type: testConstants.GET_MYTESTS_REQUEST };
  }

  function success(myTests: any, loading: boolean) {
    return { myTests, loading, type: testConstants.GET_MYTESTS_SUCCESS };
  }

  function failure(error: string, loading: boolean) {
    return { error, loading, type: testConstants.GET_MYTESTS_FAILURE };
  }
}

export function setTimeLimit(time: any) {
  return {
    type: testConstants.SET_TIME_LIMIT,
    payload: time
  };
}

export function setCandidates(candidates: any) {
  console.log(candidates, 'candidates');
  return {
    type: testConstants.SET_CANDIDATE,
    payload: candidates
  };
}

export function removeError(error: any) {
  return {
    type: testConstants.REMOVE_ERROR,
    payload: error
  };
}

export function getTest(testId: any) {
  return (dispatch: any) => {
    dispatch(request());
    service.baseApiParams.headers = { Authorization: 'Bearer ' + localStorage.getItem('token') };
    service.myTests.getTest(testId).then(
      (res: any) => {
        res.data.data.questions && dispatch(success(res.data.data));
      },
      (res: any) => {
        if (res.error.error === 'token invalid') {
          history.push('/403');
        }
        dispatch(failure(res.error.error.toString()));
      }
    );
  };

  function request() {
    return { type: testConstants.GET_TEST_REQUEST };
  }

  function success(test: boolean) {
    return { type: testConstants.GET_TEST_SUCCESS, test };
  }

  function failure(error: string) {
    return { type: testConstants.GET_TEST_FAILURE, error };
  }
}

export function cloneTest(testId: any, expectedTime: any) {
  return (dispatch: any) => {
    dispatch(request());

    service.myTests.cloneTest(testId, { expected_time: expectedTime }).then(
      (res: any) => {
        dispatch(success(res.data.data));
      },
      (res: any) => {
        dispatch(failure(res.error.error.toString()));
      }
    );
  };

  function request() {
    return { type: testConstants.CLONE_TEST_REQUEST };
  }

  function success(test: boolean) {
    return { type: testConstants.CLONE_TEST_SUCCESS, test };
  }

  function failure(error: string) {
    return { type: testConstants.CLONE_TEST_FAILURE, error };
  }
}

//action add questions to test
export function addTestQuestions(question: any, test_id: string) {
  return (dispatch: any) => {
    dispatch(request());
    service.myTests.questionsCreate(test_id, { question_id: question.ID }).then(
      (res: any) => {
        dispatch(success(question));
      },
      (res: any) => {
        dispatch(failure(res.error.toString()));
      }
    );
  };

  function request() {
    return { type: testConstants.CREATE_TEST_QUESTION_REQUEST };
  }

  function success(question: any) {
    return { type: testConstants.CREATE_TEST_QUESTION_SUCCESS, question: question };
  }

  function failure(error: any) {
    return { type: testConstants.CREATE_TEST_QUESTION_FAILURE, error };
  }
}

// action remove question from test
export function removeTestQuestions(testId: string, question: any) {
  return (dispatch: any) => {
    dispatch(request());
    service.myTests
      .questionsDeleteDelete({ test_id: Number(testId), question_id: question.ID })
      .then(
        (res: any) => {
          dispatch(success(question));
        },
        (res: any) => {
          dispatch(failure(res.error.toString()));
          console.log(res.error.toString(), 'res.error.toString() removeTestQuestions ');
        }
      );
  };

  function request() {
    return { type: testConstants.REMOVE_TEST_QUESTION_REQUEST };
  }

  function success(question: any) {
    return { type: testConstants.REMOVE_TEST_QUESTION_SUCCESS, question: question };
  }

  function failure(error: any) {
    return { type: testConstants.REMOVE_TEST_QUESTION_FAILURE, error };
  }
}
