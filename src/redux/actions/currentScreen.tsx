export const currentScreenConstants = {
  SET_CURRENT_SCREEN: 'SET_CURRENT_SCREEN'
};

export function setCurrentScreen(key: any) {
  return {
    type: currentScreenConstants.SET_CURRENT_SCREEN,
    key: key
  };
}
