import React from 'react';
import {
  Link as RouterLink
} from 'react-router-dom';
import { Link, Typography } from '@mui/material';
import AbcIcon from '@mui/icons-material/Abc';
import { appName } from '@/app/config'

const MainLogo: React.FC<{ color?: string }> = (props): JSX.Element => {
  const color = props.color || 'inherit'
  return (
    <Link component={RouterLink} to="/" color={color} sx={{
      display: { xs: 'flex' },
      textDecoration: 'none',
      alignItems: 'center'
    }}>
      <AbcIcon sx={{ mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="h1"
        sx={{
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {appName}
      </Typography>
    </Link>
  )
}

export default MainLogo