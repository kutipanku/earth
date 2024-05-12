import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import { TITLE } from '@/entity/meta/constant';

import { DRAWER_WIDTH } from '@/entity/ui/constant';
import type { AppBarProps, CustomizedAppBarProps } from './type';

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

        <Typography variant='h6' noWrap component='div' sx={{ flexGrow: 1 }}>
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
