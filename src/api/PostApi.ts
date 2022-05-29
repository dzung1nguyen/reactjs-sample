import { get, post, put, destroy } from '@/utils/axiosClient'
import { PostType } from '@/app/types'

class PostAPI {
  static all() {
    return get('/posts')
  }

  static create(data: PostType) {
    return post('/posts', data)
  }

  static show(id: number) {
    return get(`/posts/${id}`)
  }

  static update(data: PostType) {
    return put(`/posts/${data.id}`, data)
  }

  static destroy(id: number) {
    return destroy(`/posts/${id}`)
  }
}

export default PostAPI
