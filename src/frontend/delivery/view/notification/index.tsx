'use client';

import { createContext, useContext, useReducer } from '../../lib/react';
import { Alert, Slide, Snackbar } from '../../lib/mui';
import type { Dispatch } from '../../lib/react';
import { notificationStateReducer } from './reducers';
import { INITIAL_NOTIFICATION_STATE, CONTEXT_ERROR_MESSAGE } from './constants';
import type { Props, NotificationState, NotificationAction } from './types';

const ContextState = createContext<NotificationState | undefined>(undefined);
const ContextDispatch = createContext<Dispatch<NotificationAction> | undefined>(
  undefined
);

export const NotificationProvider = (props: Props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(
    notificationStateReducer,
    INITIAL_NOTIFICATION_STATE
  );

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({ type: 'CLOSE_NOTIFICATION' });
  };

  return (
    <ContextState.Provider value={state}>
      <ContextDispatch.Provider value={dispatch}>
        {children}
        <Snackbar
          open={state.isOpen}
          autoHideDuration={state.autoHideDuration}
          onClose={handleClose}
          TransitionComponent={(props) => <Slide {...props} direction='up' />}
          sx={{ position: 'absolute' }}
        >
          <Alert
            variant={state.variant}
            onClose={handleClose}
            severity={state.severity}
            sx={{ width: '100%' }}
          >
            {state.message}
          </Alert>
        </Snackbar>
      </ContextDispatch.Provider>
    </ContextState.Provider>
  );
};

export const useNotificationState = (): NotificationState => {
  const context = useContext(ContextState);

  if (context === undefined) {
    throw new Error(CONTEXT_ERROR_MESSAGE);
  }

  return context;
};

export const useNotificationDispatch = (): Dispatch<NotificationAction> => {
  const context = useContext(ContextDispatch);

  if (context === undefined) {
    throw new Error(CONTEXT_ERROR_MESSAGE);
  }

  return context;
};

type FnUseContext = () => [Dispatch<NotificationAction>];
export const useNotificationContext: FnUseContext = () => [
  useNotificationDispatch(),
];
