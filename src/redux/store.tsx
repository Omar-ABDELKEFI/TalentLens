import { createBrowserHistory, History } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';


import createRootReducer from './reducers';
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // for using redux tol

 const history: History = createBrowserHistory(); // use for navigation.

const middleware = [routerMiddleware(history), thunk];// Redux Thunk middleware allows you to write action creators

const store = createStore(createRootReducer(history), composeEnhancers(applyMiddleware(...middleware))); // holds the whole state tree of your application



export { history };

export default store;
