import { currentScreenConstants } from '@redux/actions/currentScreen';

const initialState = {
  currentScreen : ["1"]
}
// create reduce test
export function currentScreen(state = initialState, action: any) {

  switch (action.type) {
    case currentScreenConstants.SET_CURRENT_SCREEN:
      return {
        ...state,
        currentScreen: [action.key],
      };
    default:
      return state

  }
}