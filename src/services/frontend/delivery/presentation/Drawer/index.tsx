import {
  DRAWER_MENU_LIST,
  DRAWER_WIDTH,
} from '@frontend/entity/shared/ui/constants';
import logo from '@public/logo.svg';
import { Image } from '../../lib/next';
import { styled } from '../../lib/mui-systems';
import {
  MuiDrawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '../../lib/mui';
import { useEffect, useState } from '../../lib/react';
import { getMenuIcon } from '../../lib/mui-icons';
import { DrawerHeader, closedMixin, openedMixin } from './styles';
import type { DrapwerProps } from './types';

const normalizedMenuList = DRAWER_MENU_LIST.map((menu) => ({
  ...menu,
  icon: getMenuIcon(menu.icon),
}));

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

const Drawer = ({
  open,
  redirectTo,
  isSelected,
  onMobileCallback,
}: DrapwerProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 480) {
      setIsMobile(true);
      onMobileCallback();
    } else {
      setIsMobile(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const Component = isMobile ? MuiDrawer : CustomizedDrawer;
  return (
    <Component variant={isMobile ? undefined : 'permanent'} open={open}>
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
        {normalizedMenuList.map((menuItem) => (
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
    </Component>
  );
};

export default Drawer;
