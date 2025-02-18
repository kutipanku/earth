import { Button, ButtonGroup } from '../../lib/mui';
import { VisibilityIcon } from '../../lib/mui-icons';
import { ActionType } from '../../presentation';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Log } from '@frontend/entity/log/types';

interface Props {
  triggerActionClick: (type: string, dataRow: TableRowProps<Log>) => void;
}

export const getTableHeader = ({ triggerActionClick }: Props) => [
  {
    field: 'admin',
    headerName: 'Admin Name',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Log>) => params.row.admin?.name,
  },
  {
    field: 'action_type',
    headerName: 'Action Type',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<Log>) => (
      <ActionType action={params.row.action} />
    ),
  },
  { field: 'entity', headerName: 'Entity', width: 200, sortable: false },
  // {
  //   field: 'created_at',
  //   headerName: 'Action Date',
  //   width: 300,
  //   sortable: false,
  //   renderCell: (params: TableRowProps<Log>) =>
  //     `${convertDateToTime(params.row.created_at)} | ${convertDateToLocaleString(params.row.created_at)}`,
  // },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Log>) => (
      <ButtonGroup variant='outlined' aria-label='text button group'>
        <Button
          onClick={() => triggerActionClick('view', params)}
          startIcon={<VisibilityIcon />}
          size='small'
        >
          See Detail
        </Button>
      </ButtonGroup>
    ),
  },
];
