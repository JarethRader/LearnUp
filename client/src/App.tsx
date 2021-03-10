import { hot } from "react-hot-loader";
import React from "react";
import { Route, Switch } from "react-router-dom";

import retry from "./utils/retry";

import Navbar from "./components/navbar";

const Landing = React.lazy(() => retry(() => import("./routes/Landing")));
const Authentication = React.lazy(() =>
  retry(() => import("./routes/authentication/Authentication"))
);
const LearningBoard = React.lazy(() =>
  retry(() => import("./routes/LearningBoard"))
);
const Whiteboard = React.lazy(() => retry(() => import("./routes/Whiteboard")));
const Layout = React.lazy(() => retry(() => import("./routes/layout/Layout")));
const Home = React.lazy(() => retry(() => import("./routes/Home")));
const Dashboard = React.lazy(() => retry(() => import("./routes/Dashboard")));
const NotFound = React.lazy(() => retry(() => import("./routes/NotFound")));

const routes = [
  { path: "/login", name: "Sign In", Component: Authentication },
  { path: "/learningboard", name: "Learning", Component: LearningBoard },
  { path: "/whiteboard", name: "Learning", Component: Whiteboard },
  { path: "/layout", name: "Layout", Component: Layout },
  { path: "/dashboard", name: "Dashboard", Component: Dashboard },
  { path: "/home", name: "Home", Component: Home },
  { path: "/", name: "Landing", Component: Landing },
];

const App = () => {
  return (
    <div className="min-h-screen min-w-screen bg-gray-200 lexend-font">
      <React.Suspense fallback={<div></div>}>
        <Switch>
          {routes.map(({ path, Component }) => (
            <Route key={path} path={path}>
              <div>
                <Component Navbar={Navbar} />
              </div>
            </Route>
          ))}
        </Switch>
      </React.Suspense>
    </div>
  );
};

export default hot(module)(App);
