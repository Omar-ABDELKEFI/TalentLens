import service from '../../service/test-api';
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

  function success(skills: any) {
    return { type: skillsConstants.FETCH_SKILLS_SUCCESS, skills: skills };
  }

  function failure(error: any) {
    return { type: skillsConstants.FETCH_SKILLS_FAILURE, error: error };
  }
}
/*
export function createSkill(skill : string) {
  return (dispatch: any) => {
    dispatch(request());
    service.skill.skillCreate({name:skill}).then(
        (skills: any) => {
          console.log(skills)
        },
        (error: any) => {
          dispatch(failure(error));
        }
    );
  };

  function request() {
    return { type: skillsConstants.CREATE_SKILLS_REQUEST };
  }

  function success(skills: any) {
    return { type: skillsConstants.CREATE_SKILLS_SUCCESS, skills: skills };
  }

  function failure(error: any) {
    return { type: skillsConstants.CREATE_SKILLS_FAILURE, error: error };
  }
}
*/

