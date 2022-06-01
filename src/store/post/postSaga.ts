import { put, takeLatest } from 'redux-saga/effects'
import { setPosts, } from '@/store/post/postSlice'
import PostAPI from '@/api/PostApi'
import actions from '@/store/post/actions'
import { PostType } from '@/app/types'
import { setLoading, setRedirect } from '@/store/app/appSlice';
import { successAlert, errorAlert } from '@/store/alert/alertSlice';

function* getPostsSaga() {
  const data: PostType[] = yield PostAPI.all()
  yield put(setPosts(data))
}

function* createPostSaga(action: { type: string, payload: PostType }) {
  yield put(setLoading(true))
  try {
    yield PostAPI.create(action.payload)
    yield put(successAlert('Success'))
    yield put(setRedirect({path: '/posts/list'}))
  } catch (e: any) {
    console.log('e', e)
    yield put(errorAlert(e.message))
  }
  yield put(setLoading(false))

}

function* updatePostSaga(action: { type: string, payload: PostType }) {
  yield PostAPI.update(action.payload)
}

function* destroyPostSaga(action: { type: string, payload: number }) {
  const postId = action.payload
  yield PostAPI.destroy(postId)
}


export default function* postSaga() {
  yield takeLatest(actions.GET_POSTS, getPostsSaga)
  yield takeLatest(actions.CREATE_POST, createPostSaga)
  yield takeLatest(actions.UPDATE_POST, updatePostSaga)
  yield takeLatest(actions.DESTROY_POST, destroyPostSaga)
}