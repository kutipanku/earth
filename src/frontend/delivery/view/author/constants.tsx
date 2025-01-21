import { Button, ButtonGroup } from '../../lib/mui';
import {
  DeleteForeverIcon,
  EditIcon,
  VisibilityIcon,
} from '../../lib/mui-icons';
import type { Author } from '@frontend/entity/author/types';
import type { TableRowProps } from '@frontend/entity/core/types';

export const TABLE_HEADER = (
  callbackFunction: (type: string, dataRow: TableRowProps<Author>) => void
) => [
  { field: 'name', headerName: 'Name', width: 300, sortable: false },
  {
    field: 'nationality',
    headerName: 'Nationality',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Author>) => (
      <>{params.row.nationality?.nameEn}</>
    ),
  },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Author>) => (
      <ButtonGroup variant='outlined' aria-label='text button group'>
        <Button
          onClick={() => callbackFunction('view', params)}
          startIcon={<VisibilityIcon />}
        >
          Detail
        </Button>
        <Button
          onClick={() => callbackFunction('edit', params)}
          startIcon={<EditIcon />}
        >
          Ubah
        </Button>
        <Button
          onClick={() => callbackFunction('delete', params)}
          startIcon={<DeleteForeverIcon />}
        >
          Hapus
        </Button>
      </ButtonGroup>
    ),
  },
];
