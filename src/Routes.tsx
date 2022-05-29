import { CircularProgress } from '@mui/material'
import React, { Suspense } from 'react'
import { RouteObject, useRoutes } from 'react-router-dom'
const DefaultLayout = React.lazy(() => import('@/layout/default/index'))
const HomePage = React.lazy(() => import('@/pages/home/index'))
const Page404 = React.lazy(() => import('@/pages/error/404'))
const PostIndex = React.lazy(() => import('@/pages/post/index'))
const PostList = React.lazy(() => import('@/pages/post/list'))
const PostCreate = React.lazy(() => import('@/pages/post/create'))
const Validation = React.lazy(() => import('@/pages/validation/index'))

const Routes: React.FC = (): JSX.Element => {
  const routes: RouteObject[] = [
    {
      path: '/',
      element: <DefaultLayout />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: '/posts',
          element: <PostIndex />,
          children: [
            { index: true, element: <PostList /> },
            { path: '/posts/list', element: <PostList /> },
            { path: '/posts/create', element: <PostCreate /> },
          ]
        },
        { path: '/validation', element: <Validation /> },
      ]
    },
    { path: '*', element: <Page404 /> },
  ]
  const element = useRoutes(routes)
  return (
    <>
      <Suspense fallback={<CircularProgress sx={{ position: 'fixed', top: 'calc(50% - 20px)', right: 'calc(50% - 20px)' }} />}>
        {element}
      </Suspense>
    </>
  )
}

export default Routes
