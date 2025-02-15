import { Button, ButtonGroup } from '../../lib/mui';
import {
  DeleteForeverIcon,
  EditIcon,
  VisibilityIcon,
} from '../../lib/mui-icons';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Author } from '@frontend/entity/author/types';

interface Props {
  triggerActionClick: (type: string, dataRow: TableRowProps<Author>) => void;
}

export const getTableHeader = ({ triggerActionClick }: Props) => [
  { field: 'name', headerName: 'Name', width: 300, sortable: false },
  {
    field: 'nationality',
    headerName: 'Nationality',
    width: 150,
    sortable: false,
    renderCell: (params: TableRowProps<Author>) => (
      <>{params.row.nationality?.name}</>
    ),
  },
  {
    field: 'profession',
    headerName: 'Profession',
    width: 150,
    sortable: false,
    renderCell: (params: TableRowProps<Author>) => (
      <>{params.row.profession?.name}</>
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
          onClick={() => triggerActionClick('view', params)}
          startIcon={<VisibilityIcon />}
        >
          Detail
        </Button>
        <Button
          onClick={() => triggerActionClick('edit', params)}
          startIcon={<EditIcon />}
        >
          Ubah
        </Button>
        <Button
          onClick={() => triggerActionClick('delete', params)}
          startIcon={<DeleteForeverIcon />}
        >
          Hapus
        </Button>
      </ButtonGroup>
    ),
  },
];
