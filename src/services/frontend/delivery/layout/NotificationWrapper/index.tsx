'use client';
import { NotificationProvider } from '../../view/notification';

const NotificationWrapperLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};

export default NotificationWrapperLayout;
