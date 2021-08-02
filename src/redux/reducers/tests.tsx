import {testConstants} from '../actions/tests';


export function CreateTest(state = {}, action: any) {
    switch (action.type) {
        case testConstants.CREATE_TEST_SUCCESS:
            return {
                ...state,
                createTest: true,
            };
        case testConstants.CREATE_TEST_REQUEST:
            return {
                ...state,
                createTest: true,
            };
        case testConstants.CREATE_TEST_FAILURE:
            return {
                ...state,
                createTest: false
            };
        case testConstants.UPDATE_TEST_REQUEST:
            return {
                ...state,
                question: action.question
            }
        case testConstants.UPDATE_TEST_SUCCESS:
            return {
                ...state,
                question: action.question
            }
        case testConstants.UPDATE_TEST_FAILURE:
            return {
                ...state,
                error: action.error
            }
        case testConstants.UPDATE_CANDIDATE_REQUEST:
            return {
                ...state,
                candidate: action.candidate
            }
        case testConstants.CREATE_CANDIDATE_SUCCESS:
            return {
                ...state,
                candidate: action.candidate
            }
        case testConstants.CREATE_CANDIDATE_FAILURE:
            return {
                ...state,
                error_add_candidate: action.error
            }
        default:
            return state
    }
}


