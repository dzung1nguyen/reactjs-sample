import React from 'react'
import { useTranslation } from 'react-i18next'
import {List, ListItemText, ListItemButton, Typography} from '@mui/material';
import { selectCurrentLang, selectSupportedLangs, setLang } from '@/store/app/appSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'

const LayoutSettingLanguage: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const currentLang = useAppSelector(selectCurrentLang)
  const supportedLangs = useAppSelector(selectSupportedLangs)
  const { t, i18n } = useTranslation()

  const handleSelectedLanguage = (lang: any) => {
    if (lang === currentLang?.value) {
      return false
    }
    if (supportedLangs.find(language => language.value === lang)) {
      i18n.changeLanguage(lang)
      dispatch(setLang(lang))
    }
  }

  return (
    <>
      <Typography variant="body1" component="p" sx={{ margin: '20px 0px 10px' }}>
        {t('Language')}
      </Typography>
      <List sx={{ m: '0', p: 0 }}>
        {supportedLangs.map((lang, index) => (
          <ListItemButton key={`language-${index}`}
            selected={currentLang?.value === lang.value}
            onClick={() => handleSelectedLanguage(lang.value)}
            sx={{ '&.Mui-selected': { color: 'primary.main', borderRadius: '10px' } }}
          >
            <ListItemText sx={{ m: 0 }} primary={lang.text} />
          </ListItemButton>
        ))}
      </List>
    </>
  )
}

export default LayoutSettingLanguage