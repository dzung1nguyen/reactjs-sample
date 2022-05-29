import React from 'react'
import { Outlet } from 'react-router-dom'

const PostIndex: React.FC = (): JSX.Element => {
  return (
    <>
      < Outlet />
    </>
  )
}

export default PostIndex
