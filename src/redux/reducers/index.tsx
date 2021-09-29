import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { login } from './login';
import { test } from './tests';
import { skills } from './skill';
import { questions } from '@redux/reducers/question';
import { quiz } from '@redux/reducers/quiz';
import { currentScreen } from '@redux/reducers/currentScreen';
// combine all reducer
const createRootReducer = (history: History) =>
  combineReducers<any>({
    router: connectRouter(history),
    login,
    test,
    skills,
    questions,
    quiz,
    currentScreen
  });
export default createRootReducer;

