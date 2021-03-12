/**
 * @description This file will preload pages. It is set up to prelaod pages users are expected to navigate to next based on the current page they are on.
 * It could be optimized further after allowing users to use teh site and seeing what order they visit which pages in.
 */

const Landing = () => import("../routes/Landing");
const Authentication = () => import("../routes/authentication/Authentication");
const Layout = () => import("../routes/layout/Layout");
const Whiteboard = () => import("../routes/whiteboard/Whiteboard");
const Home = () => import("../routes/Home");
const Dashboard = () => import("../routes/Dashboard");

export const prefetchMap = [
  {
    path: "/",
    prefetchComponents: [Authentication, Home],
  },
  {
    path: "/login",
    prefetchComponents: [Dashboard],
  },
  {
    path: "/dashboard",
    prefetchComponents: [Layout, Whiteboard],
  },
];
