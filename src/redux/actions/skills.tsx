import service from '@service/test-api';
import { ModelsSkillsResponse } from '../../myApi';
import { history } from '@redux/store';
// action skill types
export const skillsConstants = {
  FETCH_SKILLS_REQUEST: 'FETCH_SKILLS_REQUEST',
  FETCH_SKILLS_SUCCESS: 'FETCH_SKILLS_SUCCESS',
  FETCH_SKILLS_FAILURE: 'FETCH_SKILLS_FAILURE',
  //
  CREATE_SKILLS_REQUEST: 'CREATE_SKILLS_REQUEST',
  CREATE_SKILLS_SUCCESS: 'CREATE_SKILLS_SUCCESS',
  CREATE_SKILLS_FAILURE: 'CREATE_SKILLS_FAILURE'

};

// action get  skills
export function getSkills() {
  return (dispatch: any) => {
    dispatch(request());
    service.baseApiParams.headers = { 'Authorization': 'Bearer ' + localStorage.getItem('token') };
    service.skills.skillsList().then(
      (skills: any) => {
        console.log(skills);
        dispatch(success(skills.data.data));
      },
      (res: any) => {
        if (res.error.error === 'token invalid') {
          history.push('/403');
        }
        dispatch(failure(res, res.error.error));
      }
    );
  };

  function request() {
    return { type: skillsConstants.FETCH_SKILLS_REQUEST };
  }

  function success(skills: ModelsSkillsResponse[]) {
    return { skills, type: skillsConstants.FETCH_SKILLS_SUCCESS };
  }

  function failure(error: any, tokenError: any) {
    return { error, tokenError, type: skillsConstants.FETCH_SKILLS_FAILURE };
  }
}

