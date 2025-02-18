import { Chip } from '../../lib/mui';
import {
  AddCircleIcon,
  DeleteForeverIcon,
  ImportExportIcon,
} from '../../lib/mui-icons';

interface Props {
  action: string;
}

const ActionType = ({ action }: Props) => {
  switch (action) {
    case 'create':
      return (
        <Chip
          icon={<AddCircleIcon />}
          label='Created'
          color='success'
          variant='outlined'
          size='small'
        />
      );
    case 'update':
      return (
        <Chip
          icon={<ImportExportIcon />}
          label='Updated'
          color='info'
          variant='outlined'
          size='small'
        />
      );
    case 'delete':
      return (
        <Chip
          icon={<DeleteForeverIcon />}
          label='Deleted'
          color='error'
          variant='outlined'
          size='small'
        />
      );
    default:
      return <></>;
  }
};

export default ActionType;
