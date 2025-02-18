import { TITLE, DESCRIPTION } from '@frontend/entity/shared/constants';
import { AppRouterCacheProvider, ThemeProvider } from '../../lib/mui-systems';
import { theme } from '../../lib/mui-systems';
import AuthWrapperLayout from '../AuthWrapper';
import NotificationWrapper from '../NotificationWrapper';

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
          <AuthWrapperLayout>
            <NotificationWrapper>
              <body>{children}</body>
            </NotificationWrapper>
          </AuthWrapperLayout>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
