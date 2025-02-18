import type { MouseEvent } from '../../lib/react';
import type { MuiAppBarProps } from '../../lib/mui';

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
