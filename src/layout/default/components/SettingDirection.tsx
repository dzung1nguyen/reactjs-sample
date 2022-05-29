import React from 'react'
import { useTranslation } from 'react-i18next'
import { ToggleButton, ToggleButtonGroup, Icon, Typography } from '@mui/material';
import { FormatTextdirectionLToR, FormatTextdirectionRToL } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { selectSupportedDirections, selectDirection, setDirection } from '@/store/app/appSlice';

const iconsMap: Record<string, any> = {
  FormatTextdirectionLToR: FormatTextdirectionLToR,
  FormatTextdirectionRToL: FormatTextdirectionRToL,
}

const LayoutSettingDirection: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const directions = useAppSelector(selectSupportedDirections)
  const currentDirection = useAppSelector(selectDirection)
  const { t } = useTranslation()

  const changeMode = (event: React.MouseEvent<HTMLElement>, direction: string) => {
    if (direction === currentDirection) {
      return false
    }
    if (directions.find(item => item.value === direction)) {
      dispatch(setDirection(direction))
    }
  }

  return (
    <>
      {directions.length > 0 && <>
        <Typography variant="body1" component="p" sx={{ margin: '20px 0px 10px' }}>
          {t('Direction')}
        </Typography>
        <ToggleButtonGroup
          color="primary"
          value={currentDirection}
          exclusive
          onChange={changeMode}
          sx={{ width: '100%', display: 'flex' }}
        >
          {directions.map((direction) => (
            <ToggleButton key={`${direction.value}`} value={direction.value} sx={{ fontSize: '0.875rem', width: '100%', textTransform: 'inherit', color: 'inherit' }}>
              {direction.icon && iconsMap[direction.icon] && <Icon sx={{ mr: '5px' }} component={iconsMap[direction.icon]} />}
              {direction.text}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </>
      }
    </>
  )
}

export default LayoutSettingDirection