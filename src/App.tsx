import React from 'react'
import { useTranslation } from 'react-i18next';
import {
  Location,
  useLocation
} from 'react-router-dom';
import Routes from './Routes'
import { useAppSelector } from './app/hooks'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { selectMode, selectDirection } from './store/app/appSlice';
import useMediaQuery from '@mui/material/useMediaQuery';
import { themeLightColor, themeDarkolor } from './app/config';
import '@/assets/css/app.css';

const App: React.FC = (): JSX.Element => {
  const isSystemDark: boolean = useMediaQuery('(prefers-color-scheme: dark)')
  const themeMode = useAppSelector(selectMode)
  const direction = useAppSelector(selectDirection)
  const theme = React.useMemo(
    () => {
      const mode = themeMode === 'system' ?
        (isSystemDark ? 'dark' : 'light')
        : ['light', 'dark'].includes(themeMode) ? themeMode : 'light' // Because we will save the config at storage, and someone can edit value
      return createTheme({
        direction,
        palette: {
          mode: 'light',
          ...(mode === 'light'
            ? themeLightColor
            : themeDarkolor)
        },
      })
    },
    [isSystemDark, themeMode, direction],
  )

  const {t} = useTranslation()
  const location: Location = useLocation();

  React.useEffect(() => {
    document.title = t(`pages.${location.pathname}`)
  }, [location.pathname]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </>
  )
}

export default App
