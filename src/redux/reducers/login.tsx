import { userConstants } from '../actions/login';

// create login reducer
export function login(state={loggingIn:false}, action:any) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return {error:action.error};
        default:
            return state
    }
}
