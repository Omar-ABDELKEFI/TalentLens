import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from '@redux/store';


const Home = React.lazy(() => import('@screens/login/Login'));
const CreateTest = React.lazy(() => import('@screens/createTest/CreateTest'));
const Question = React.lazy(() => import('@components/questions_types/McaQuestions/McaQuestions'));
const notAutorized = React.lazy(() => import('@screens/errorResult/notAuthorized'));
const PageNotExist = React.lazy(() => import('@screens/errorResult/PageNotExist'));
const DisplayTests = React.lazy(() => import('@screens/displayTests/DisplayTests'));
const DisplayQuiz = React.lazy(() => import('@screens/quiz/Quiz'));
const StartTest = React.lazy(() => import('@screens/startTest/StartTest'));
const DisplayCandidates = React.lazy(() => import('@screens/displayCandidates/DisplayCandidates'));

// @ts-ignore


const public_paths = [
  { exact: true, path: '/', component: Home },
  { exact: true, path: '/my-tests/:idTest', component: CreateTest },
  { exact: true, path: '/my-tests', component: DisplayTests },
  { exact: true, path: '/questions/edit', component: Question },
  { exact: true, path: '/quiz/:idTestCandidate', component: StartTest },
  { exact: true, path: '/candidates', component: DisplayCandidates },
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
