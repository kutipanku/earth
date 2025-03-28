'use client';

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '../../lib/mui';

interface Props {
  identifier: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DialogDeletePresentation = ({
  identifier,
  isOpen,
  onClose,
  onConfirm,
}: Props) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Are you sure to delete <i style={{ fontWeight: 800 }}>{identifier}</i>
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>No</Button>
        <Button onClick={onConfirm} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogDeletePresentation;
