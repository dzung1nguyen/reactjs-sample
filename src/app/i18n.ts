import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import { defaultLang } from '@/app/config'

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    debug: process.env.NODE_ENV !== 'production',
    lng: defaultLang,
    fallbackLng: defaultLang,
  })

export default i18n