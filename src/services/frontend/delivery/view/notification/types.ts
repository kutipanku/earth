import type { ReactNode } from '../../lib/react';

export interface Props {
  children: ReactNode;
}

export interface NotificationState {
  isOpen: boolean;
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
  variant: 'standard' | 'filled' | 'outlined';
  autoHideDuration?: number;
}

export interface DispatchProps {
  message: string;
  severity: 'success' | 'info' | 'warning' | 'error';
}

export type NotificationAction = {
  type: 'OPEN_NOTIFICATION' | 'CLOSE_NOTIFICATION';
  payload?: DispatchProps;
};
