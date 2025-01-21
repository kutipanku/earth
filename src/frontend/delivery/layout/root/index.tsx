import { TITLE, DESCRIPTION } from '@/entity/meta/constant';
import NotificationWrapper from '../notification-wrapper';
import SessionProvider from '@/repository/state/auth';
import { AppRouterCacheProvider, ThemeProvider } from '../../lib/mui-systems';
import { theme } from '../../lib/mui-systems';
import type { Metadata } from '../../lib/next';

import './globals.css';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <SessionProvider>
            <NotificationWrapper>
              <body>{children}</body>
            </NotificationWrapper>
          </SessionProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
