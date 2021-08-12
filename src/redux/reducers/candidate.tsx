import { candidateConstants } from '@redux/actions/candidate';

// create login reducer
export function candidate(state={loading:true}, action:any) {
  switch (action.type) {
    case candidateConstants.START_TEST_REQUEST:
      return {
        loading:action.loading
      };
    case candidateConstants.START_TEST_SUCCESS:
      return {
        loading:action.loading,
        testInfo: action.testInfo
      };
    case candidateConstants.START_TEST_FAILURE:
      return {error:action.error};
    default:
      return state
  }
}
