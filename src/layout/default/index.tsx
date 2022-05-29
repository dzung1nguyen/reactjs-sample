import React from 'react'
import { Outlet } from 'react-router-dom'
import { Box, Container, Toolbar } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Menu from './Menu'
import Header from './Header'

const DefaultLayout: React.FC = (): JSX.Element => {
  return (
    <Box>
      <CssBaseline />
      <Header />
      <Box sx={{ display: 'flex', position: 'relative', zIndex: 0 }}>
        <Menu />
        <Box component="main" sx={{ flexGrow: 1 }}>
          <Toolbar/>
          <Container maxWidth="xl">
            <Outlet />
          </Container>
        </Box>
      </Box>
    </Box>
  )
}

export default DefaultLayout