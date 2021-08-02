import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import {authentication} from './login';
import {CreateTest} from './tests'
import { skills } from './skill';
import { questions } from '@redux/reducers/question';
export default (history: History) =>
  combineReducers<any>({
    router: connectRouter(history),
      authentication,
      CreateTest,
      skills,
      questions
  });
