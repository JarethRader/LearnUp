const Contact = () => import('../routes/Contact');
const About = () => import('../routes/About');
const Authenticate = () => import('../routes/Authentication');

export const prefetchMap = [
  {
    path: '/',
    prefetchComponents: [Authenticate],
  },
  {
    path: '/login',
    prefetchComponents: [About],
  },
];
