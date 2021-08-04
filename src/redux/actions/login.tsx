import React from "react";
import service from "@service/test-api";
import {history} from "@redux/store";
import {ModelsLoginInput} from "../../myApi";

//login action types
export const userConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
};

//action login
export function login(user: ModelsLoginInput) {
    return (dispatch: any) => {
        dispatch(request(true));

        service.login.loginCreate(user)
            .then(
                (res: any) => {
                    dispatch(success(user,false));
                    history.push("/my-tests")
                    localStorage.setItem('token',String(res.data.token))
                },
                (res: any) => {
                    dispatch(failure(res.error.error.toString(),false));
                }
            );
    };

    function request(loading: boolean) {
        return {type: userConstants.LOGIN_REQUEST, loading}
    }

    function success(user: ModelsLoginInput,loading:boolean) {
        return {type: userConstants.LOGIN_SUCCESS, user,loading}
    }

    function failure(error: ModelsLoginInput,loading:boolean) {
        return {type: userConstants.LOGIN_FAILURE, error,loading}
    }
}