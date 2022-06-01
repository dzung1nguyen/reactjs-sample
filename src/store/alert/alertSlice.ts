import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'

type AlertType = {
  open?: boolean,
  hideDuration?: number,
  vertical?: 'top' | 'bottom',
  horizontal?: 'right' | 'left' | 'center',
  type?: 'error' | 'warning' | 'info' | 'success',
  message: string,
}

type StateType = {
  alert: AlertType
}

const initialState: StateType = {
  alert: {
    open: false,
    hideDuration: 8000,
    type: 'info',
    message: '',
    vertical: 'top',
    horizontal: 'right',
  }
}

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    showAlert: (state, action: { type: string, payload: AlertType }) => {
      state.alert = {
        ...initialState.alert,
        ...action.payload,
        open: true
      }
    },

    infoAlert: (state, action: { type: string, payload: string }) => {
      state.alert = {
        ...initialState.alert,
        message: action.payload,
        open: true,
        type: 'info'
      }
    },

    successAlert: (state, action: { type: string, payload: string }) => {
      state.alert = {
        ...initialState.alert,
        message: action.payload,
        open: true,
        type: 'success'
      }
    },

    warningAlert: (state, action: { type: string, payload: string }) => {
      state.alert = {
        ...initialState.alert,
        message: action.payload,
        open: true,
        type: 'warning'
      }
    },

    errorAlert: (state, action: { type: string, payload: string }) => {
      state.alert = {
        ...initialState.alert,
        message: action.payload,
        open: true,
        type: 'error'
      }
    },

    closeAlert: (state) => {
      state.alert = {
        ...initialState.alert
      }
    },
  },
})

// actions
export const { showAlert, closeAlert, successAlert, warningAlert, errorAlert, infoAlert } = alertSlice.actions

// selector
export const selectAlert = (state: RootState) => state.alert.alert

export default alertSlice.reducer