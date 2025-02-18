import { Button, ButtonGroup, Chip, Link, Stack } from '../../lib/mui';
import {
  DeleteForeverIcon,
  EditIcon,
  VisibilityIcon,
} from '../../lib/mui-icons';

import type { TableRowProps } from '@frontend/entity/shared/types';
import type { Quote } from '@frontend/entity/quote/types';

interface Props {
  triggerActionClick: (type: string, dataRow: TableRowProps<Quote>) => void;
}

export const getTableHeader = ({ triggerActionClick }: Props) => [
  {
    field: 'contentEng',
    headerName: 'Content (EN)',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Quote>) => (
      <div
        dangerouslySetInnerHTML={{
          __html: params.row.content.eng,
        }}
      ></div>
    ),
  },
  {
    field: 'contentInd',
    headerName: 'Content (ID)',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Quote>) => (
      <div
        dangerouslySetInnerHTML={{
          __html: params.row.content.ind,
        }}
      ></div>
    ),
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<Quote>) => {
      if (params.row.author === null) return '-';

      return (
        <Link href={`/dashboard/author/${params.row.author?.id}`}>
          <Button>{params.row.author?.name}</Button>
        </Link>
      );
    },
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<Quote>) => {
      if (params.row.category === null) return '-';

      return (
        <Link href={`/dashboard/category/${params.row.category?.id}`}>
          <Button>{params.row.category?.name}</Button>
        </Link>
      );
    },
  },
  {
    field: 'tag',
    headerName: 'Tags',
    width: 400,
    sortable: false,
    renderCell: (params: TableRowProps<Quote>) => {
      if (params.row.tags === null || !params.row.tags?.length) return '-';

      return (
        <Stack direction='row' spacing={1}>
          {params.row.tags.map((tag) => (
            <Chip
              key={tag.id}
              label={tag.name}
              href={`/dashboard/tag/${tag.id}`}
              component='a'
              color='primary'
              variant='outlined'
            />
          ))}
        </Stack>
      );
    },
  },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Quote>) => (
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
