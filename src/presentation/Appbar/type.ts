import { MouseEvent } from 'react';
import type { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

export interface CustomizedAppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export interface AppBarProps extends CustomizedAppBarProps {
  open: boolean;
  displayName: string;
  image: string;
  anchorEl: HTMLElement | null;
  openMenu: boolean;
  handleClick: (event: MouseEvent<HTMLButtonElement>) => void;
  handleClose: () => void;
  handleDrawerOpen: () => void;
  handleDrawerClose: () => void;
  handleLogout: () => void;
}
