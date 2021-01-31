import { hot } from 'react-hot-loader';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

import retry from './utils/retry';

import Navbar from './components/navbar';

const Home = React.lazy(() => retry(() => import('./routes/Home')));
const About = React.lazy(() => retry(() => import('./routes/About')));
const Contact = React.lazy(() => retry(() => import('./routes/Contact')));
const NotFound = React.lazy(() => retry(() => import('./routes/NotFound')));

const routes = [
  { path: '/contact', name: 'Contact', Component: Contact },
  { path: '/about', name: 'About Me', Component: About },
  { path: '/', name: 'Home', Component: Home },
];

const App = () => {
  return (
    <div className='min-h-screen min-w-screen bg-gray-200'>
      <Navbar routes={routes} />
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
