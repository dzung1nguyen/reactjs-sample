import { all } from 'redux-saga/effects'
import postSaga from '@/store/post/postSaga'

export default function* rootSaga() {
  yield all([
    postSaga()
  ])
}