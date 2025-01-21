import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { renderActionLogType } from '@/entity/log/function';
import { convertDateToLocaleString } from '@/lib/date';
import { convertDateToTime } from '@/lib/time';
import type { Log, LogVariables } from '@/entity/log/type';
import type { Filter, TableRowProps } from '@/entity/ui/type';
// ================================================================

// Page Meta
export const PAGE_TYPE = 'log';
export const HOME_PAGE_TITLE = 'Logs';
export const DETAIL_PAGE_TITLE = 'Log Detail';
// ================================================================

// Table Properties
export const INITIAL_FILTER_STATE: Filter[] = [
  {
    label: 'Admin Name',
    key: 'user_id',
    value: '',
  },
  {
    label: 'Action Type',
    key: 'action',
    value: '',
  },
  {
    label: 'Entity',
    key: 'entity',
    value: '',
  },
];

export const TABLE_HEADER = (
  callbackFunction: (type: string, dataRow: TableRowProps<Log>) => void
) => [
  {
    field: 'admin',
    headerName: 'Admin Name',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Log>) => params.row.user.name,
  },
  {
    field: 'action_type',
    headerName: 'Action Type',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<Log>) =>
      renderActionLogType(params.row.action),
  },
  { field: 'entity', headerName: 'Entity', width: 200, sortable: false },
  {
    field: 'created_at',
    headerName: 'Action Date',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Log>) =>
      `${convertDateToTime(params.row.created_at)} | ${convertDateToLocaleString(params.row.created_at)}`,
  },
  {
    field: 'action',
    headerName: 'Action',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Log>) => (
      <ButtonGroup variant='outlined' aria-label='text button group'>
        <Button
          onClick={() => callbackFunction('view', params)}
          startIcon={<VisibilityIcon />}
          size='small'
        >
          See Detail
        </Button>
      </ButtonGroup>
    ),
  },
];

export const INPUT_VARIABLE: LogVariables = {
  action: '',
  entity: '',
};
