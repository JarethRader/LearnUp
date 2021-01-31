import { hot } from 'react-hot-loader';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import retry from './utils/retry';

import Navbar from './components/navbar';

const Landing = React.lazy(() => retry(() => import('./routes/Landing')));
const Authentication = React.lazy(() =>
  retry(() => import('./routes/Authentication'))
);
const About = React.lazy(() => retry(() => import('./routes/About')));
const Contact = React.lazy(() => retry(() => import('./routes/Contact')));
const NotFound = React.lazy(() => retry(() => import('./routes/NotFound')));

const routes = [
  { path: '/login', name: 'Sign In', Component: Authentication },
  { path: '/contact', name: 'Contact', Component: Contact },
  { path: '/about', name: 'About Me', Component: About },
  { path: '/', name: 'Home', Component: Landing },
];

const App = () => {
  return (
    <div className='min-h-screen min-w-screen bg-gray-200'>
      {/* <Navbar routes={routes} /> */}
      <React.Suspense fallback={<div></div>}>
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              <div>
                <Component />
              </div>
            </Route>
          ))}
        </Switch>
      </React.Suspense>
    </div>
  );
};

export default hot(module)(App);
