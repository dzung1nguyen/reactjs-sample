import React from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleButton, ToggleButtonGroup, Icon, Typography } from '@mui/material';
import { LightMode, DarkMode, AutoMode } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectSupportedModes, selectMode, setMode } from '@/store/app/appSlice';

const iconsMap: Record<string, any> = {
  LightMode: LightMode,
  DarkMode: DarkMode,
  AutoMode: AutoMode,
}

const LayoutSettingMode: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const modes = useAppSelector(selectSupportedModes)
  const currentMode = useAppSelector(selectMode)
  const { t } = useTranslation()

  const changeMode = (event: React.MouseEvent<HTMLElement>, mode: string) => {
    if (mode === currentMode) {
      return false
    }
    if (modes.find(item => item.value === mode)) {
      dispatch(setMode(mode))
    }
  }

  return (
    <>
      {modes.length > 0 && <>
        <Typography variant="body1" component="p" sx={{ margin: '20px 0px 10px' }}>
          {t('Mode')}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={currentMode}
          exclusive
          onChange={changeMode}
          sx={{ width: '100%', display: 'flex' }}
        >
          {modes.map((mode) => (
            <ToggleButton key={`${mode.value}`} value={mode.value} sx={{ fontSize: '0.875rem', width: '100%', textTransform: 'inherit', color: 'inherit' }}>
              {mode.icon && iconsMap[mode.icon] && <Icon sx={{ mr: '5px' }} component={iconsMap[mode.icon]} />}
              {mode.text}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </>}
    </>
  )
}

export default LayoutSettingMode