const Contact = () => import('../routes/Contact');
const About = () => import('../routes/About');

export const prefetchMap = [
  {
    path: '/home',
    prefetchComponents: [Contact],
  },
  {
    path: '/contact',
    prefetchComponents: [About],
  },
];
