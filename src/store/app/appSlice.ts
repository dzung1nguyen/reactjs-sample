import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { supportedModes, supportedDirections, supportedLangs, defaultLang, defaultMode, defaultDirection } from '@/app/config'
import StorageUtil from '@/utils/storageUtil'
import { DefaultItemType } from '@/app/types';

type StateType = {
  mode: 'light' | 'dark' | 'system',
  direction: 'ltr' | 'rtl',
  lang: string
  supportedModes: DefaultItemType[]
  supportedDirections: DefaultItemType[]
  supportedLangs: DefaultItemType[]
  drawerSettingOpen: boolean
  drawerMenuOpen: boolean
  loading: boolean
  redirect: {
    path?: string | null
    replace: boolean
  }
}

const initialState: StateType = {
  mode: StorageUtil.get('THEME_MODE', defaultMode),
  direction: StorageUtil.get('DIRECTION', defaultDirection),
  lang: defaultLang,
  supportedModes,
  supportedDirections,
  supportedLangs: [...supportedLangs],
  drawerSettingOpen: false,
  drawerMenuOpen: false,
  loading: false,
  redirect: {
    path: null,
    replace: false
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setMode: (state, action) => {
      const mode = action.payload
      if (state.mode !== mode && supportedModes.find(item => item.value === mode)) {
        state.mode = mode
        StorageUtil.set('THEME_MODE', mode)
      }
    },
    setDirection: (state, action) => {
      const direction = action.payload
      if (state.direction !== direction && supportedDirections.find(item => item.value === direction)) {
        state.direction = direction
        StorageUtil.set('DIRECTION', direction)
      }
    },
    setLang: (state, action) => {
      const lang = action.payload
      if (state.lang !== lang && supportedLangs.find(language => language.value === lang)) {
        state.lang = lang
      }
    },
    setDrawerSettingOpen: (state, action) => {
      state.drawerSettingOpen = action.payload
    },
    setDrawerMenuOpen: (state, action) => {
      state.drawerMenuOpen = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setRedirect: (state, action: {type: string, payload: {path?: string, replace?:boolean}}) => {
      const { path, replace } = action.payload
      state.redirect = {
        path: path || null,
        replace: replace || false
      }
    },
  },
})

// actions
export const { setMode, setDirection, setLang, setDrawerSettingOpen, setDrawerMenuOpen, setLoading, setRedirect } = appSlice.actions

// selector
export const selectMode = (state: RootState) => state.app.mode
export const selectDirection = (state: RootState) => state.app.direction
export const selectSupportedModes = (state: RootState) => state.app.supportedModes
export const selectSupportedDirections = (state: RootState) => state.app.supportedDirections
export const selectLang = (state: RootState) => state.app.lang
export const selectCurrentLang = (state: RootState) => state.app.supportedLangs.find(language => language.value === state.app.lang)
export const selectSupportedLangs = (state: RootState) => state.app.supportedLangs
export const selectDrawerSettingOpen = (state: RootState) => state.app.drawerSettingOpen
export const selectDrawerMenuOpen = (state: RootState) => state.app.drawerMenuOpen
export const selectLoading = (state: RootState) => state.app.loading
export const selectRedirect = (state: RootState) => state.app.redirect

export default appSlice.reducer