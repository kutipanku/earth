import Chip from '@mui/material/Chip';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ImportExportIcon from '@mui/icons-material/ImportExport';

export const renderActionLogType = (action: string) => {
  switch (action) {
    case 'add':
      return (
        <Chip
          icon={<AddCircleIcon />}
          label='Add'
          color='success'
          variant='outlined'
          size='small'
        />
      );
    case 'edit':
      return (
        <Chip
          icon={<ImportExportIcon />}
          label='Edit'
          color='info'
          variant='outlined'
          size='small'
        />
      );
    case 'delete':
      return (
        <Chip
          icon={<DeleteForeverIcon />}
          label='Delete'
          color='error'
          variant='outlined'
          size='small'
        />
      );
    default:
      return <></>;
  }
};
