import { configureStore } from '@reduxjs/toolkit'
import postReducer from '@/store/post/postSlice'
import appReducer from '@/store/app/appSlice'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    app: appReducer,
    post: postReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
