
import React from 'react'
import { Snackbar, Alert } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectAlert, closeAlert } from '@/store/alert/alertSlice';

const PageAlert: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const alert = useAppSelector(selectAlert)
  const close = () => {
    dispatch(closeAlert())
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: alert.vertical || 'top', horizontal: alert.horizontal || 'right' }}
        autoHideDuration={alert.hideDuration}
        open={alert.open}
        onClose={() => close()}>
        <Alert onClose={() => close()} severity={alert.type} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default PageAlert