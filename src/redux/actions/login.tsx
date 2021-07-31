import React from "react";
import service from "../../service/test-api";
import {history} from "@redux/store";

export const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
};


export function login(login: any, from: any) {
    return (dispatch: any) => {
        dispatch(request(login.email));

        service.login.loginCreate(login)
            .then(
                (login: any) => {
                    dispatch(success(login));
                    history.push("/my-tests")

                },
                (error: any) => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user: any) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }

    function success(user: any) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }

    function failure(error: any) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}