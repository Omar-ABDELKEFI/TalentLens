import service from '@service/test-api';
import { ModelsSkillsResponse } from '../../myApi';
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
    service.skills.skillsList().then(
      (skills: any) => {
        console.log(skills);
        dispatch(success(skills.data.data));
      },
      (error: any) => {

        dispatch(failure(error));
      }
    );
  };

  function request() {
    return { type: skillsConstants.FETCH_SKILLS_REQUEST };
  }

      function success(skills: ModelsSkillsResponse[]) {
    return { skills, type: skillsConstants.FETCH_SKILLS_SUCCESS , skills };
  }

  function failure(error: any) {
    return { error,type: skillsConstants.FETCH_SKILLS_FAILURE };
  }
}

