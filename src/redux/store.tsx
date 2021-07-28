import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import createRootReducer from './reducers';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

 const history: History = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const middleware = [routerMiddleware(history), thunk, sagaMiddleware];

const store = createStore(createRootReducer(history), composeEnhancers(applyMiddleware(...middleware)));



export { history };

export default store;
