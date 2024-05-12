import type { NotificationState } from './types';

export const INITIAL_NOTIFICATION_STATE: NotificationState = {
  isOpen: false,
  message: '',
  severity: 'success',
  variant: 'filled',
  autoHideDuration: 7000,
};

export const CONTEXT_ERROR_MESSAGE =
  'Please use notification hook within NotificationProvider';
