import React from 'react';
import { useTranslation } from 'react-i18next';
import { Drawer, Divider, Typography, IconButton, Box, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SettingLanguage from './SettingLanguage';
import SettingMode from './SettingMode';
import SettingDirection from './SettingDirection';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { selectDrawerSettingOpen, setDrawerSettingOpen } from '@/store/app/appSlice';

const SettingDrawer: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const open = useAppSelector(selectDrawerSettingOpen);
  const setOpen = (status: boolean) => dispatch(setDrawerSettingOpen(status))

  const toggleDrawer =
    (open: boolean) =>
      (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
          event &&
          event.type === 'keydown' &&
          ((event as React.KeyboardEvent).key === 'Tab' ||
            (event as React.KeyboardEvent).key === 'Shift')
        ) {
          return;
        }
        dispatch(setDrawerSettingOpen(open))
      };

  return (
    <>
      <React.Fragment>
        <Drawer
          anchor='right'
          open={open}
          onClose={toggleDrawer(false)}

        >
          <Box sx={{ width: '330px' }}>
            <Toolbar>
              <Typography variant="h6" component="p" sx={{ m: '0' }}>
                {t('Settings')}
              </Typography>
              <IconButton onClick={() => setOpen(false)} sx={{ ml: 'auto' }} color="primary"><CloseIcon /></IconButton >
            </Toolbar>
            <Divider variant='fullWidth' sx={{ m: '0' }} />
            <Box sx={{ px: '1rem' }}>
              <SettingMode />
              <SettingDirection />
              <SettingLanguage />
            </Box>
          </Box>
        </Drawer>
      </React.Fragment>
    </>
  );
}

export default SettingDrawer