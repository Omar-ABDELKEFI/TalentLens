import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import {authentication} from './login';

export default (history: History) =>
  combineReducers<any>({
    router: connectRouter(history),
      authentication
  });
