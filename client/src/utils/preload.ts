const Landing = () => import('../routes/Landing');
const Authentication = () => import('../routes/Authentication');
const LearningBoard = () => import('../routes/LearningBoard');
const Home = () => import('../routes/Home');
const Dashboard = () => import('../routes/Dashboard');

export const prefetchMap = [
  {
    path: '/',
    prefetchComponents: [Authentication, Home],
  },
  {
    path: '/login',
    prefetchComponents: [Dashboard],
  },
  {
    path: '/dashboard',
    prefetchComponents: [LearningBoard],
  },
];
