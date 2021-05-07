import { hot } from "react-hot-loader";
import React from "react";
import { Route, Switch } from "react-router-dom";

import { setCSRF } from "./actions/utils/config";
import { getSession } from "./actions/userAPI/userActions";
import retry from "./utils/retry";

import Navbar from "./components/navbar";

const Landing = React.lazy(() => retry(() => import("./routes/Landing")));
const Authentication = React.lazy(() =>
  retry(() => import("./routes/authentication/Authentication"))
);
const Whiteboard = React.lazy(() =>
  retry(() => import("./routes/whiteboard/Whiteboard"))
);
const Layout = React.lazy(() => retry(() => import("./routes/layout/Layout")));
const Home = React.lazy(() => retry(() => import("./routes/Home")));
const Dashboard = React.lazy(() => retry(() => import("./routes/Dashboard")));
const NotFound = React.lazy(() => retry(() => import("./routes/NotFound")));

const routes = [
  { path: "/login", name: "Sign In", Component: Authentication },
  { path: "/whiteboard", name: "Learning", Component: Whiteboard },
  { path: "/layout", name: "Layout", Component: Layout },
  { path: "/dashboard", name: "Dashboard", Component: Dashboard },
  { path: "/home", name: "Home", Component: Home },
  { path: "/", name: "Landing", Component: Landing },
];

import { LayoutProvider } from "./context/layout/layoutContext";
import { WhiteboardProvider } from "./context/whiteboard/whiteboardContext";
import { RTCProvider } from "./context/connection/connectionContext";

import { connect, ConnectedProps } from "react-redux";
import { RootState } from "./reducers/index";

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = {
  getSession,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

const App = (props: Props) => {
  React.useEffect(() => {
    setCSRF();
    console.log("Checking if session exists");
    props.getSession();
  }, []);

  return (
    <div className="min-h-screen min-w-screen bg-gray-200 lexend-font">
      <React.Suspense fallback={<div></div>}>
        <Switch>
          {routes.map(({ path, Component }) => {
            switch (path) {
              case "/layout":
                return (
                  <Route key={path} path={path}>
                    <div>
                      <LayoutProvider>
                        <Component Navbar={Navbar} />
                      </LayoutProvider>
                    </div>
                  </Route>
                );
              case "/whiteboard":
                return (
                  <Route key={path} path={path}>
                    <div>
                      <WhiteboardProvider>
                        <RTCProvider>
                          <Component Navbar={Navbar} />
                        </RTCProvider>
                      </WhiteboardProvider>
                    </div>
                  </Route>
                );
              default:
                return (
                  <Route key={path} path={path}>
                    <div>
                      <Component Navbar={Navbar} />
                    </div>
                  </Route>
                );
            }
          })}
        </Switch>
      </React.Suspense>
    </div>
  );
};

export default hot(module)(connector(App));
