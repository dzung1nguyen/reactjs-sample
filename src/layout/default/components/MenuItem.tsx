import React from 'react'
import {
  Link as RouterLink,
  Location,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ListItemButton, ListItemText, ListItemIcon } from '@mui/material';
import { KeyboardArrowDown, Dashboard, Article, FiberManualRecord, Rule } from '@mui/icons-material';
import { PageType } from '@/app/types';

const iconsMap: Record<string, any> = {
  Dashboard: <Dashboard />,
  Article: <Article />,
  Rule: <Rule />,
}

const isPatchMatch = (locationPath: string, path: string): boolean => {
  return locationPath === path || !!locationPath.match(new RegExp(`^${path}`));
}

const getIcon = (key: string) => {
  return key in iconsMap ? iconsMap[key] : null
}

const hasChildren = (page: PageType): boolean => {
  return page.children && page.children.length > 0 ? true : false
}

const homePath = '/';

const MenuItem: React.FC<{ page: PageType, location: Location }> = (props): JSX.Element => {
  const { t } = useTranslation()
  const { page, location } = props
  const isOpen = page.children && page.children.length && !!page.children.find(child => isPatchMatch(location.pathname, child.path))
  const isHomeActive = (location.pathname === homePath && page.path === homePath)
  const [open, setOpen] = React.useState(isOpen);
  const handleClick = (page: PageType) => {
    if (page.children && page.children.length > 0) {
      setOpen(!open);
    }
    return false;
  };

  return (
    <>
      <ListItemButton component={hasChildren(page) ? 'div' : RouterLink} to={page.path} alignItems="flex-start"
        onClick={() => handleClick(page)}
        selected={isHomeActive || (page.path !== homePath && isPatchMatch(location.pathname, page.path))}
        sx={{
          display: 'flex', alignItems: 'center',
          '&.Mui-selected': {
            color: 'primary.main',
            backgroundColor: 'transparent'
          }
        }}
      >
        {page.icon && <ListItemIcon sx={{ color: 'inherit', m: 0, minWidth: '35px' }}>
          {getIcon(page.icon)}
        </ListItemIcon>
        }
        <ListItemText
          primary={page.title ? t(page.title) : t(`pages.${page.path}`)}
          primaryTypographyProps={{
            fontSize: '1rem',
            fontWeight: 'medium',
            lineHeight: '20px',
          }}
        />
        {page.children && page.children?.length > 0 &&
          <KeyboardArrowDown sx={{
            mr: -1,
            opacity: 1,
            transform: open ? 'rotate(0)' : 'rotate(-90deg)',
            transition: '0.25s',
          }}
          />}
      </ListItemButton>
      {page.children && page.children?.length > 0 && open &&
        page.children.map((child: PageType) => (
          <ListItemButton
            key={child.path}
            component={RouterLink}
            to={child.path}
            selected={isPatchMatch(location.pathname, child.path)}
            sx={{
              py: 0, minHeight: 32, pl: '2rem',
              '&.Mui-selected': {
                backgroundColor: 'transparent',
                ' svg': {
                  color: 'primary.main',
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: 'inherit', minWidth: '30px', }}>
              <FiberManualRecord sx={{ width: '10px', height: '10px' }} />
            </ListItemIcon>
            <ListItemText
              primary={child.title ? t(child.title) : t(`pages.${child.path}`)}
              primaryTypographyProps={{ fontSize: 14, fontWeight: 'medium' }}
            />
          </ListItemButton>
        ))
      }
    </>
  )
}

export default MenuItem