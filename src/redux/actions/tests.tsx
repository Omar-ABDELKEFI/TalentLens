import {Dispatch} from 'redux';
import React from "react";
import service from "../../service/test-api";
import {history} from "@redux/store";

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


export function createTest() {
    return (dispatch: any) => {
        dispatch(request());

        service.myTests.myTestsCreate({}) // id create automaticly
            .then(
                (res: any) => {
                    dispatch(success());
                    console.log(res, "res")
                    history.push(`/my-tests/${res.data.test.ID}`)

                },
                (error: any) => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request() {
        return {type: testConstants.CREATE_TEST_REQUEST}
    }

    function success() {
        return {type: testConstants.CREATE_TEST_SUCCESS}
    }

    function failure(error: any) {
        return {type: testConstants.CREATE_TEST_FAILURE, error}
    }
}

export function updateTest(testId: any, question: any) {
    return (dispatch: any) => {
        dispatch(request(question.name));

        service.myTests.updateTest(testId, question)
            .then(
                (res: any) => {
                    dispatch(success(question));
                    console.log(res, "res")


                },
                (error: any) => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(name: any) {
        return {type: testConstants.CREATE_TEST_REQUEST, question: name};
    }

    function success(question: any) {
        return {type: testConstants.CREATE_TEST_SUCCESS, question: question}
    }

    function failure(error: any) {
        return {type: testConstants.CREATE_TEST_FAILURE, error}
    }
}

export function add_question(question: any) {
    return (dispatch: any) => {
        dispatch(request(question));

        service.candidate.candidateCreate(question)
            .then(
                (res: any) => {
                    dispatch(success(question));
                    console.log(res, "res")


                },
                (res: any) => {
                    dispatch(failure(res.error));
                    console.log(res.error)
                }
            );
    };

    function request(question: any) {
        return {type: testConstants.ADD_QUESTION_REQUEST, question: question};
    }

    function success(question: any) {
        return {type: testConstants.ADD_QUESTION_SUCCESS, question: question}
    }

    function failure(error: any) {
        return {type: testConstants.ADD_QUESTION_FAILURE, error}
    }
}

