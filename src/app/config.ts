import { DefaultItemType } from './types'
export const appName: string = process.env.REACT_APP_NAME || 'AppName'
export const baseURL: string = process.env.REACT_APP_BASE_URL || 'http://locahost:3000'
export const baseAPI: string = process.env.REACT_APP_API_URL || 'http://locahost:3000'
export const defaultLang = 'en'
export const defaultMode = 'light'
export const defaultDirection = 'ltr'
export const supportedLangs: DefaultItemType[] = [
  {
    value: 'en',
    text: 'English',
  },
  {
    value: 'vi',
    text: 'Tiếng Việt',
  }
]
export const themeLightColor = {
  primary: {
    light: '#009688',
    main: '#009688',
    dark: '#009688',
    contrastText: '#fff',
  },
  background: {
    default: '#fafafa',
    paper: '#fafafa',
  },
  text: {
    primary: '#111',
    secondary: '#424242',
  }
}
export const themeDarkolor = {
  primary: {
    light: '#000',
    main: '#009688',
    dark: '#000',
    contrastText: '#fff',
  },
  background: {
    default: '#333',
    paper: '#222',
  },
  text: {
    primary: '#fff',
    secondary: '#fafafa',
  }
}
export const supportedModes = [
  {
    value: 'system',
    text: 'System',
    icon: 'AutoMode'
  },
  {
    value: 'light',
    text: 'Light',
    icon: 'LightMode'
  },
  {
    value: 'dark',
    text: 'Dark',
    icon: 'DarkMode'
  },
]
export const supportedDirections: DefaultItemType[] = [
  {
    value: 'ltr',
    text: 'Left to right',
    icon: 'FormatTextdirectionLToR',
  },
  {
    value: 'rtl',
    text: 'Right to left',
    icon: 'FormatTextdirectionRToL',
  },
]
// Setting menu
export const leftMenuWidth = 250
export const leftMenuOnMobile = 'lg'