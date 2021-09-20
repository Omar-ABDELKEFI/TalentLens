import { skillsConstants } from '@redux/actions/skills';
import { IskillReducerState } from '../../types';

const initialState : IskillReducerState = {
  loading : true ,
  skills : []
}
export function skills(state = initialState, action: any) {
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
        error: action.error,
        tokenError:action.tokenError
      };
    default:
      return state;
  }
}
