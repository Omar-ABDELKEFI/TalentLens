import { ModelsSkillsResponse } from './myApi';

export interface IskillReducerState {
  loading: boolean;
  skills: ModelsSkillsResponse [];
}


export interface Ichoice {
  choice_text: string;
  is_answer: boolean;
  id?: number;
}

export interface Iquestion {
  choices?: Ichoice[];
  difficulty: string;
  expected_time: number;
  file_read_me?: string;
  max_points: number;
  name: string;
  question_text: string;
  skill_id?: number;
  type?: string;
  skill_name?: string
}
