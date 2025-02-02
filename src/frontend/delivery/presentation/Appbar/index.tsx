import { TITLE, DRAWER_WIDTH } from '@/frontend/entity/core/ui/constants';
import {
  Box,
  MuiAppBar,
  Toolbar,
  IconButton,
  Typography,
  Tooltip,
  Avatar,
  Menu,
  MenuItem,
} from '../../lib/mui';
import { dynamic } from '../../lib/next';
import { styled } from '../../lib/mui-systems';
import type { AppBarProps, CustomizedAppBarProps } from './types';

const ChevronLeftIcon = dynamic(
  () => import('../../lib/mui-icons').then((module) => module.ChevronLeftIcon),
  {
    ssr: false,
  }
);

const MenuIcon = dynamic(
  () => import('../../lib/mui-icons').then((module) => module.MenuIcon),
  {
    ssr: false,
  }
);

const CustomizedAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<CustomizedAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const AppBar = ({
  open,
  displayName,
  image,
  anchorEl,
  openMenu,
  handleClick,
  handleClose,
  handleDrawerOpen,
  handleDrawerClose,
  handleLogout,
}: AppBarProps) => {
  return (
    <CustomizedAppBar
      position='fixed'
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {!open ? (
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={{
              marginRight: 5,
            }}
          >
            <MenuIcon />
          </IconButton>
        ) : (
          <IconButton
            onClick={handleDrawerClose}
            color='inherit'
            aria-label='open drawer'
            edge='start'
            sx={{
              marginRight: 5,
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        )}

        <Typography variant='h6' noWrap sx={{ flexGrow: 1 }}>
          {TITLE}
        </Typography>
        <Box sx={{ flexGrow: 0, display: 'flex' }}>
          <Typography variant='caption' sx={{ alignSelf: 'center', mr: 2 }}>
            {displayName}
          </Typography>
          <Tooltip title='Open settings'>
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar alt={displayName} src={image}>
                {displayName.slice(0, 2)}
              </Avatar>
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id='menu-appbar'
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openMenu}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>
              <Typography textAlign='center'>Log Out</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </CustomizedAppBar>
  );
};

export default AppBar;
