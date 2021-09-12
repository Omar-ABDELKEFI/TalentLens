import React from "react";
import service from "@service/test-api";
import {history} from "@redux/store";


// candidate action types
export const candidateConstants = {
  START_TEST_REQUEST: 'START_TEST_REQUEST',
  START_TEST_SUCCESS: 'START_TEST_SUCCESS',
  START_TEST_FAILURE: 'START_TEST_FAILURE',
};

// action startTest
export function startTest(idTestCandidate:any) {
  return (dispatch: any) => {
    dispatch(request(true));

    service.startTest.startTest(idTestCandidate)
      .then(
        (res: any) => {
          console.log(res.data.data,"res");
          dispatch(success(res.data.data,false));
        },
        (res: any) => {
          console.log(res,"ressss");
          dispatch(failure(res.error,false));
        }
      );
  };

  function request(loading: boolean) {
    return {loading,type: candidateConstants.START_TEST_REQUEST, }
  }

  function success(testInfo: any,loading:boolean) {
    return {testInfo,loading,type: candidateConstants.START_TEST_SUCCESS}
  }

  function failure(error: any,loading:boolean) {
    return {error,loading,type: candidateConstants.START_TEST_FAILURE}
  }
}

