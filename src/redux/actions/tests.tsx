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
  ADD_QUESTION_REQUEST: 'ADD_QUESTION_REQUEST',
  ADD_QUESTION_SUCCESS: 'ADD_QUESTION_SUCCESS',
  ADD_QUESTION_FAILURE: 'ADD_QUESTION_FAILURE',
  //
  GET_MYTESTS_REQUEST: 'GET_MYTESTS_REQUEST',
  GET_MYTESTS_SUCCESS: 'GET_MYTESTS_SUCCESS',
  GET_MYTESTS_FAILURE: 'GET_MYTESTS_FAILURE',
  //
  SET_TIME_LIMIT: 'SET_TIME_LIMIT',
  //
  GET_TEST_REQUEST: 'GET_TEST_REQUEST',
  GET_TEST_SUCCESS: 'GET_TEST_SUCCESS',
  GET_TEST_FAILURE: 'GET_TEST_FAILURE'


};

// action create test
export function createTest() {
  return (dispatch: any) => {
    dispatch(request(true));

    service.myTests.myTestsCreate({}) // id create automaticly
      .then(
        (res: any) => {
          dispatch(success(false));
          history.push(`/my-tests/${res.data.test.ID}`)
        },
        (res: any) => {
          dispatch(failure(res.error.error.toString(), false));
        }
      );
  };

  function request(loading: boolean) {
    return { loading, type: testConstants.CREATE_TEST_REQUEST };
  }

  function success(loading: boolean) {
    return { loading, type: testConstants.CREATE_TEST_SUCCESS };
  }

  function failure(error: string, loading: boolean) {
    return { error, loading, type: testConstants.CREATE_TEST_FAILURE };
  }
}

// action update test
export function updateTest(testId: number, test: ModelsTest) {
  return (dispatch: any) => {
    dispatch(request(true));

    service.myTests.updateTest(testId, test)
      .then(
        (res: any) => {
          dispatch(success(test, false));
          console.log(res, 'res');


        },
        (res: any) => {
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

    service.candidate.candidateCreate(candidate)
      .then(
        () => {
          dispatch(success(candidate, false));


        },
        (res: any) => {
          dispatch(failure(res.error.error.toString(), true));

        }
      );
  };

  function request(loading: boolean) {
    return { loading, type: testConstants.CREATE_CANDIDATE_REQUEST };
  }

  function success(candidate: ModelsCandidateRequest[], loading: boolean) {
    return { candidate, loading, type: testConstants.CREATE_CANDIDATE_SUCCESS };
  }

  function failure(error: string, loading: boolean) {
    return { error, loading, type: testConstants.CREATE_CANDIDATE_FAILURE };
  }
}

export function getMyTests() {
  return (dispatch: any) => {
    dispatch(request(true));
    service.myTests.getMyTests()
      .then(
        (res: any) => {
          console.log(res);
          dispatch(success(res.data.test, false));
        },
        (res: any) => {
          console.log(res);
          dispatch(failure(res.error.error.toString, false));
        }
      );
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

export function getTest(testId : any) {
  return (dispatch: any) => {
    dispatch(request());

    service.myTests.getTest(testId)
      .then(
        (res: any) => {
          res.data.data.questions && dispatch(success(res.data.data));
        },
        (res: any) => {
          dispatch(failure(res.error.error.toString()));
        }
      );
  };

  function request() {
    return { type: testConstants.GET_TEST_REQUEST };
  }

  function success(test: boolean) {
    return {type: testConstants.GET_TEST_SUCCESS , test};
  }

  function failure(error: string) {
    return { type: testConstants.GET_TEST_FAILURE , error };
  }
}
