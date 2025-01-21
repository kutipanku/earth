'use client';
import { NotificationProvider } from '../../view/notification';

const NotificationWrapper = ({ children }: { children: React.ReactNode }) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};

export default NotificationWrapper;
