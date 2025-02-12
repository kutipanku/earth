import { Button, ButtonGroup } from '../../lib/mui';
import {
  DeleteForeverIcon,
  EditIcon,
  VisibilityIcon,
} from '../../lib/mui-icons';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Nationality } from '@frontend/entity/nationality/types';

interface Props {
  triggerActionClick: (
    type: string,
    dataRow: TableRowProps<Nationality>
  ) => void;
}

export const getTableHeader = ({ triggerActionClick }: Props) => [
  {
    field: 'nameEn',
    headerName: 'Name (EN)',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Nationality>) => (
      <>{params.row.name.eng}</>
    ),
  },
  {
    field: 'nameId',
    headerName: 'Name (ID)',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Nationality>) => (
      <>{params.row.name.ind}</>
    ),
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Nationality>) => <>/{params.row.slug}</>,
  },
  {
    field: 'flag',
    headerName: 'Flag',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<Nationality>) => {
      if (params.row.flag) return <>/{params.row.flag}</>;
      return '-';
    },
  },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Nationality>) => (
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
