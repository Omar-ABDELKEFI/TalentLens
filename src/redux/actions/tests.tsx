import {Dispatch} from 'redux';
import React from "react";
import service from "../../service/test-api";
import {history} from "@redux/store";
import {ModelsCandidate, ModelsTest} from "../../myApi";
// action test types
export const testConstants = {
    CREATE_TEST_REQUEST: 'CREATE_TEST_REQUEST',
    CREATE_TEST_SUCCESS: 'CREATE_TEST_SUCCESS',
    CREATE_TEST_FAILURE: 'CREATE_TEST_FAILURE',
    //
    UPDATE_TEST_REQUEST: 'UPDATE_TEST_REQUEST',
    UPDATE_TEST_SUCCESS: 'UPDATE_TEST_REQUEST',
    UPDATE_TEST_FAILURE: 'UPDATE_TEST_REQUEST',
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

}

//action create test
export function createTest() {
    return (dispatch: any) => {
        dispatch(request(true));

        service.myTests.myTestsCreate({}) // id create automaticly
            .then(
                (res: any) => {
                    dispatch(success(false));
                    console.log(res, "res")
                    history.push(`/my-tests/${res.data.test.ID}`)

                },
                (res: any) => {
                    dispatch(failure(res.error.error.toString(),false));
                }
            );
    };

    function request(loading:boolean) {
        return {type: testConstants.CREATE_TEST_REQUEST,loading}
    }

    function success(loading:boolean) {
        return {type: testConstants.CREATE_TEST_SUCCESS,loading}
    }

    function failure(error: string,loading:boolean) {
        return {type: testConstants.CREATE_TEST_FAILURE, error,loading}
    }
}

//action update test
export function updateTest(testId: number, question: ModelsTest) {
    return (dispatch: any) => {
        dispatch(request(true));

        service.myTests.updateTest(testId, question)
            .then(
                (res: any) => {
                    dispatch(success(question,true));
                    console.log(res, "res")


                },
                (res: any) => {
                    dispatch(failure(res.error.error.toString(),false));
                }
            );
    };

    function request(loading: boolean) {
        return {type: testConstants.CREATE_TEST_REQUEST, loading};
    }

    function success(question: ModelsTest,loading: boolean) {
        return {type: testConstants.CREATE_TEST_SUCCESS, question: question,loading}
    }

    function failure(error: string,loading: boolean) {
        return {type: testConstants.CREATE_TEST_FAILURE, error,loading}
    }
}

//action create candidate
export function create_candidate(candidate:ModelsCandidate) {
    return (dispatch: any) => {
        dispatch(request(true));

        service.candidate.candidateCreate(candidate)
            .then(
                () => {
                    dispatch(success(candidate,false));



                },
                (res: any) => {
                    dispatch(failure(res.error.error.toString(),true));

                }
            );
    };

    function request(loading: boolean) {
        return {type: testConstants.CREATE_CANDIDATE_REQUEST, loading};
    }

    function success(candidate: ModelsCandidate,loading: boolean) {
        return {type: testConstants.CREATE_CANDIDATE_SUCCESS, candidate: candidate,loading}
    }

    function failure(error: string,loading: boolean) {
        return {type: testConstants.CREATE_CANDIDATE_FAILURE, error,loading}
    }
}
/*export function addTestQuestions(question_id : number, test_id : string) {
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
        return {type: testConstants.CREATE_TEST_QUESTION_REQUEST};
    }

    function success(test_question:any) {
        return {type: testConstants.CREATE_TEST_QUESTION_SUCCESS,test_question:test_question}
    }

    function failure(error: any) {
        return {type: testConstants.CREATE_TEST_QUESTION_FAILURE, error}
    }
}
export function removeTestQuestions(id : string) {
    return (dispatch: any) => {
        dispatch(request());
        service.myTests.questionsIdDelete(id)
            .then(
                (res: any) => {
                    dispatch(success())
                    console.log(res, "dataa")
                },
                (res: any) => {
                    dispatch(failure(res.error.toString()));
                    console.log(res.error.toString())
                }
            );
    };

    function request() {
        return {type: testConstants.REMOVE_TEST_QUESTION_REQUEST};
    }

    function success() {
        return {type: testConstants.REMOVE_TEST_QUESTION_SUCCESS}
    }

    function failure(error: any) {
        return {type: testConstants.REMOVE_TEST_QUESTION_FAILURE, error}
    }
}*/




