import React from 'react'
import {
  Location,
  useLocation
} from 'react-router-dom';
import { Toolbar, Divider, List, Box, Drawer, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setDrawerMenuOpen, selectDrawerMenuOpen } from '@/store/app/appSlice';
import { leftMenuWidth, leftMenuOnMobile } from '@/app/config'
import pages from '@/pages'
import { PageType } from '@/app/types';
import MenuItem from './components/MenuItem';
import MainLogo from '@/components/MainLogo';

interface Props {
  window?: () => Window;
}

const Menu: React.FC = (props: Props): JSX.Element => {
  const { window } = props;
  const dispatch = useAppDispatch()
  const menuOpen: boolean = useAppSelector(selectDrawerMenuOpen)
  const setMenuOpen = (status: boolean) => dispatch(setDrawerMenuOpen(status))
  const handleDrawerToggle = () => {
    setMenuOpen(!menuOpen);
  };
  const location: Location = useLocation();

  const drawer = (
    <>
      <Divider />
      <List
        sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
        component="nav"
      >
        {pages.map((page: PageType) => <MenuItem key={page.path} page={page} location={location}/>)}
      </List>
    </>
  )

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{ width: { [leftMenuOnMobile]: leftMenuWidth }, flexShrink: { [leftMenuOnMobile]: 0 }, }}
    >
      <Drawer
        container={container}
        variant="temporary"
        open={menuOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', [leftMenuOnMobile]: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: leftMenuWidth },
        }}
      >
        <Toolbar>
          <MainLogo color='primary'/>
          <IconButton onClick={() => setMenuOpen(false)} sx={{ ml: 'auto' }} color="primary"><ArrowBackIcon /></IconButton >
        </Toolbar>
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', [leftMenuOnMobile]: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: leftMenuWidth },
        }}
        open
      >
        <Toolbar />
        {drawer}
      </Drawer>
    </Box>
  );
}

export default Menu