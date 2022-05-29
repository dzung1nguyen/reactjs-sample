import React from 'react'
import { AppBar, Box, Toolbar, IconButton, Container } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import HeaderUserMenu from './components/HeaderUserMenu';
import SettingDrawer from './components/Setting';
import MainLogo from '@/components/MainLogo';
import { useAppDispatch } from '@/app/hooks';
import { setDrawerSettingOpen, setDrawerMenuOpen } from '@/store/app/appSlice';
import { leftMenuOnMobile } from '@/app/config'

const DefaultHeader: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const setSettingOpen = (status: boolean) => dispatch(setDrawerSettingOpen(status))
  const setMenuOpen = (status: boolean) => dispatch(setDrawerMenuOpen(status))

  return (
    <>
      <AppBar position="fixed" sx={{ zIndex: 1 }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', [leftMenuOnMobile]: 'none', mr: '5px' } }}>
              <IconButton color="inherit" onClick={() => setMenuOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Box>
            <MainLogo/>
            <Box sx={{ display: 'flex', ml: 'auto' }}>
              <IconButton aria-label="fingerprint" color="inherit" onClick={() => setSettingOpen(true)}>
                <SettingsIcon />
              </IconButton>
            </Box>
            <HeaderUserMenu />
          </Toolbar>
        </Container>
      </AppBar>
      <SettingDrawer />
    </>
  );
};
export default DefaultHeader;