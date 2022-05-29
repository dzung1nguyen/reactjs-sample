import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { PostType } from '@/app/types'

type stateType = {
  posts: PostType[]
  post: PostType | undefined
}

const initialState: stateType = {
  posts: [],
  post: undefined,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload
    },
    showPost: (state, action) => {
      state.post = action.payload
    },
    createPost: (state, action) => {
      state.post = action.payload
    },
    updatePost: (state, action) => {
      state.post = action.payload
    },
    destroyPost: (state) => {
      state.post = undefined
    },
  },
})

// actions
export const { setPosts, showPost, createPost, updatePost, destroyPost } = postSlice.actions

// selector
export const selectPosts = (state: RootState) => state.post.posts
export const selectPost = (state: RootState) => state.post.post

export default postSlice.reducer
