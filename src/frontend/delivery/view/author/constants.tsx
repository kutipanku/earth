import { Button, ButtonGroup } from '../../lib/mui';
import {
  DeleteForeverIcon,
  EditIcon,
  VisibilityIcon,
} from '../../lib/mui-icons';
import type { TableRowProps } from '@frontend/entity/core/types';
import type { AuthorListItem } from '@frontend/repository/api/author/types';

export const TABLE_HEADER = (
  callbackFunction: (
    type: string,
    dataRow: TableRowProps<AuthorListItem>
  ) => void
) => [
  { field: 'name', headerName: 'Name', width: 300, sortable: false },
  {
    field: 'nationality',
    headerName: 'Nationality',
    width: 150,
    sortable: false,
    renderCell: (params: TableRowProps<AuthorListItem>) => (
      <>{params.row.nationality?.name}</>
    ),
  },
  {
    field: 'profession',
    headerName: 'Profession',
    width: 150,
    sortable: false,
    renderCell: (params: TableRowProps<AuthorListItem>) => (
      <>{params.row.profession?.name}</>
    ),
  },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<AuthorListItem>) => (
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
