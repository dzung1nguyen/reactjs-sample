import React, { useEffect } from 'react'
import { selectPosts } from '@/store/post/postSlice'
import { useAppSelector, useAppDispatch } from '@/app/hooks'
import actions from '@/store/post/actions'

const PostList: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const posts = useAppSelector(selectPosts)

  useEffect(() => {
    dispatch({type: actions.GET_POSTS})
  }, [])

  return (
    <>
      <h1>List Posts</h1>
      {posts.map((post, index) => {
        return (
          <div key={index}>
            <div>{post.id}</div>
            <div>{post.title}</div>
          </div>
        )
      })}
    </>
  )
}

export default PostList
