import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'
import postReducer from '@/store/post/postSlice'
import appReducer from '@/store/app/appSlice'
import alertReducer from '@/store/alert/alertSlice'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    app: appReducer,
    post: postReducer,
    alert: alertReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
