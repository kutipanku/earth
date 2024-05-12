import Image from 'next/image';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { DRAWER_MENU_LIST } from '@/entity/ui/constant';

import type { DrapwerProps } from './type';
import { DrawerHeader, closedMixin, openedMixin } from './style';
import { DRAWER_WIDTH } from '@/entity/ui/constant';
import logo from '../../../public/logo.svg';

const CustomizedDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme, DRAWER_WIDTH),
    '& .MuiDrawer-paper': openedMixin(theme, DRAWER_WIDTH),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Drawer = ({ open, redirectTo, isSelected }: DrapwerProps) => {
  return (
    <CustomizedDrawer variant='permanent' open={open}>
      <DrawerHeader></DrawerHeader>
      <Divider />
      <List>
        <ListItem
          disablePadding
          sx={{ display: 'block', textAlign: 'center', height: 76 }}
        >
          <Image
            src={logo}
            priority
            alt='Logo Perusahaan'
            className='h-10 w-10 rounded-full'
            width={open ? 64 : 32}
            height={64}
          />
        </ListItem>
        <Divider />
        {DRAWER_MENU_LIST.map((menuItem) => (
          <ListItem
            key={menuItem.text}
            disablePadding
            sx={{ display: 'block' }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
              }}
              onClick={() => redirectTo(menuItem.path)}
              selected={isSelected(menuItem.path)}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : 'auto',
                  justifyContent: 'center',
                }}
              >
                {<menuItem.icon />}
              </ListItemIcon>
              <ListItemText
                primary={menuItem.text}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </CustomizedDrawer>
  );
};

export default Drawer;
