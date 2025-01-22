import { Button, ButtonGroup } from '../../lib/mui';
import {
  DeleteForeverIcon,
  EditIcon,
  VisibilityIcon,
} from '../../lib/mui-icons';

import type { TableRowProps } from '@frontend/entity/core/types';
import type { ProfessionListItem } from '@frontend/repository/api/profession/types';

export const TABLE_HEADER = (
  callbackFunction: (
    type: string,
    dataRow: TableRowProps<ProfessionListItem>
  ) => void
) => [
  {
    field: 'nameEn',
    headerName: 'Name (EN)',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<ProfessionListItem>) => (
      <>{params.row.name.eng}</>
    ),
  },
  {
    field: 'nameId',
    headerName: 'Name (ID)',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<ProfessionListItem>) => (
      <>{params.row.name.ind}</>
    ),
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<ProfessionListItem>) => (
      <>/{params.row.slug}</>
    ),
  },
  {
    field: 'icon',
    headerName: 'Icon',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<ProfessionListItem>) => {
      if (params.row.icon) return <>/{params.row.icon}</>;
      return '-';
    },
  },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<ProfessionListItem>) => (
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
