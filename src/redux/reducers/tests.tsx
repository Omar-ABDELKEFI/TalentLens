import {testConstants} from '@redux/actions/tests';
const initialState = {
    loading:true,
    test:{
        questions : [],
    },
    myTests : []
}
// create reduce test
export function test(state = initialState, action: any) {

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
                loading: action.loading
            }
        case testConstants.UPDATE_TEST_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                test: {...state.test,...action.test}
            }
        case testConstants.UPDATE_TEST_FAILURE:
            return {
                ...state,
                loading:action.loading,
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
        case testConstants.GET_MYTESTS_REQUEST:
        return {
          ...state,
            loading:action.loading,
        }
        case testConstants.GET_MYTESTS_SUCCESS:
            return {
                ...state,
                loading:action.loading,
                myTests:action.myTests
            }
        case testConstants.GET_MYTESTS_FAILURE:
            return {
                ...state,
                loading: action.loading,
                error:action.error,
            }
        case testConstants.SET_TIME_LIMIT:
            return {
              ...state,
                timeLimit:action.payload
            }
        case testConstants.GET_TEST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case testConstants.GET_TEST_SUCCESS:
            return {
                ...state,
                loading: false,
                test: action.test,
            };
        case testConstants.GET_TEST_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.error
            };
        case testConstants.CLONE_TEST_REQUEST:
            return {
                ...state,
                loading:true,
            }
        case testConstants.CLONE_TEST_SUCCESS:
            return {
                ...state,
                loading:false,
                myTests: [action.test , ...state.myTests]
            }
        case testConstants.CLONE_TEST_FAILURE:
            return {
                ...state,
                loading: false,
                error:action.error,
            }
        case testConstants.SET_CANDIDATE:
            return {
              ...state,
                newCandidates:action.payload
            }
        default:
            return state
    }
}


