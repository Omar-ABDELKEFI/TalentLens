import { skillsConstants } from '@redux/actions/skills';

//create reduce skiils
export function skills(state = {}, action: any) {
  switch (action.type) {
    case skillsConstants.FETCH_SKILLS_REQUEST:
      return {
        loading: true
      };
    case skillsConstants.FETCH_SKILLS_SUCCESS:
      return {
        loading: false,
        skills: action.skills
      };
    case skillsConstants.FETCH_SKILLS_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}
