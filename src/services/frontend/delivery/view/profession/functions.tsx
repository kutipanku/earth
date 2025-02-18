import { Button, ButtonGroup } from '../../lib/mui';
import {
  DeleteForeverIcon,
  EditIcon,
  VisibilityIcon,
} from '../../lib/mui-icons';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Profession } from '@frontend/entity/profession/types';

interface Props {
  triggerActionClick: (
    type: string,
    dataRow: TableRowProps<Profession>
  ) => void;
}

export const getTableHeader = ({ triggerActionClick }: Props) => [
  {
    field: 'nameEn',
    headerName: 'Name (EN)',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Profession>) => (
      <>{params.row.name.eng}</>
    ),
  },
  {
    field: 'nameId',
    headerName: 'Name (ID)',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Profession>) => (
      <>{params.row.name.ind}</>
    ),
  },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Profession>) => <>/{params.row.slug}</>,
  },
  {
    field: 'icon',
    headerName: 'Icon',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<Profession>) => {
      if (params.row.icon) return <>/{params.row.icon}</>;
      return '-';
    },
  },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Profession>) => (
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
