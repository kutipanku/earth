'use client';

import {
  FC,
  PropsWithChildren,
  useCallback,
  useState,
  MouseEvent,
} from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';

import Box from '@mui/material/Box';
import { Container } from '@mui/material';

import AppBar from '@/presentation/appbar';
import Drawer from '@/presentation/drawer';

import { DrawerHeader } from './style';

const Dashboard: FC<
  PropsWithChildren<{ displayName: string; image: string }>
> = ({ children, displayName, image }) => {
  const router = useRouter();
  const currentPath = usePathname();

  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const isSelected = useCallback(
    (link: string) => {
      return currentPath === link;
    },
    [currentPath]
  );

  // Account menu controller
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const redirectTo = useCallback(
    (link: string) => {
      if (currentPath === link) {
        return;
      }
      router.push(link);
    },
    [currentPath, router]
  );

  const handleLogout = () => {
    signOut({ callbackUrl: '/login' });
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        open={open}
        displayName={displayName}
        image={image}
        anchorEl={anchorEl}
        openMenu={openMenu}
        handleClick={handleClick}
        handleClose={handleClose}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
        handleLogout={handleLogout}
      />
      <Drawer open={open} redirectTo={redirectTo} isSelected={isSelected} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Container
          maxWidth={false}
          disableGutters
          sx={{ width: '100%', minHeight: 1000 }}
        >
          {children}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;
