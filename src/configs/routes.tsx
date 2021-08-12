import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from '@redux/store';


console.log(store.getState().loggingIn, "ffff")

const Home = React.lazy(() => import('@screens/login/Login'));
const CreateTest = React.lazy(() => import('@screens/createTest/CreateTest'));
const Question = React.lazy(() => import('@screens/question/Question'));
const notAutorized = React.lazy(() => import('@screens/errorResult/notAuthorized'));
const PageNotExist = React.lazy(() => import('@screens/errorResult/PageNotExist'));
const DisplayTests = React.lazy(() => import('@screens/displayTests/DisplayTests'));
const DisplayQuiz = React.lazy(() => import('@screens/quiz/Quiz'));
const StartTest = React.lazy(() => import('@screens/startTest/StartTest'))

// @ts-ignore


// console.log(history.location.pathname,"history")
const public_paths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/my-tests/:idTest', component: CreateTest },
  { exact: true, path: '/exam/:idTestCandidate', component: StartTest},
    {exact: true, path: '/my-tests', component: DisplayTests },
  { exact: true, path: '/question', component: Question },
  { exact: true, path: '/quiz/', component: DisplayQuiz } ,
  { exact: true, path: '/403', component: notAutorized },
  { exact: false, path: '/*', component: PageNotExist }
];

const public_routes = public_paths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
));


const App = () => (
  <Provider store={store}>
    <Suspense fallback={<div/>}>
      <ConnectedRouter history={history}>
        <Switch>
          {public_routes}
        </Switch>
      </ConnectedRouter>
    </Suspense>
  </Provider>
);
export default App;
