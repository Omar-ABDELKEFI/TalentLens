import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import store, { history } from '../redux/store';
import Header from '@layout/header/header';

const Home = React.lazy(() => import('../screens/login/Login'));
const CreateTest = React.lazy(() => import('../screens/createTest/CreateTest'));
const Displaytests = React.lazy(() => import('../screens/displayTests/DisplayTests'));
const Question = React.lazy(() => import('../screens/question/Question'));
const publicPaths = [
  /*{exact: true, path: '/', component: Home},*/
  { exact: true, path: '/my-tests/:idTest', component: CreateTest },
  { exact: true, path: '/my-tests', component: Displaytests },
  { exact: true, path: '/question', component: Question }
];

const publicRoutes = publicPaths.map(({ path, ...props }) => (
  <Route key={path} path={path} {...props} />
));

export default () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Suspense fallback={<div />}>
          {publicRoutes}
          {/* <Route component={NotFound} /> */}
        </Suspense>
      </Switch>
    </ConnectedRouter>
  </Provider>
);
