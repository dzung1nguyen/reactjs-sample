import { PageType } from './app/types';

const pages: readonly PageType[] = [
  {
    path: '/',
    icon: 'Dashboard',
  },
  {
    path: '/posts',
    icon: 'Article',
    children: [
      {
        path: '/posts/list',
      },
      {
        path: '/posts/create',
        title: 'Create post'
      }
    ]
  },
  {
    path: '/validation',
    icon: 'Rule',
  },
]

export default pages