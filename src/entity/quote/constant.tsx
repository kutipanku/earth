import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IndonesiaIcon from '@/public/icons/id.png';
import EnglishIcon from '@/public/icons/gb.png';
import type { Filter, TableRowProps } from '@/entity/ui/type';
import type {
  Quote,
  QuoteDetailField,
  QuoteInputFIeld,
  QuoteVariables,
} from '@/entity/quote/type';
// ================================================================

// Page Meta
export const PAGE_TYPE = 'quote';
export const HOME_PAGE_TITLE = 'Nationalities';
export const HOME_PAGE_REDIRECT_ADD = 'Add Quote';
export const DETAIL_PAGE_TITLE = 'Quote Detail';
export const ADD_PAGE_TITLE = 'Add Quote';
export const EDIT_PAGE_TITLE = 'Edit Quote';
// ================================================================

// Table Properties
export const INITIAL_FILTER_STATE: Filter[] = [
  {
    label: 'Name',
    key: 'name',
    value: '',
  },
  {
    label: 'Slug',
    key: 'slug',
    value: '',
  },
];

export const TABLE_HEADER = (
  callbackFunction: (type: string, dataRow: TableRowProps<Quote>) => void
) => [
  {
    field: 'content_en',
    headerName: 'Content (EN)',
    width: 300,
    sortable: false,
  },
  {
    field: 'content_id',
    headerName: 'Content (ID)',
    width: 300,
    sortable: false,
  },
  {
    field: 'author',
    headerName: 'Author',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<Quote>) => {
      if (params.row.author === null) return '-';

      return <>{params.row.author?.name}</>;
    },
  },
  {
    field: 'category',
    headerName: 'Category',
    width: 200,
    sortable: false,
    renderCell: (params: TableRowProps<Quote>) => {
      if (params.row.category === null) return '-';

      return <>{params.row.category?.name_en}</>;
    },
  },
  { field: 'tag', headerName: 'Tags', width: 200, sortable: false },
  { field: 'slug', headerName: 'Slug', width: 200, sortable: false },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Quote>) => (
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
// ================================================================

// Detail Properties
export const DETAIL_FIELDS: QuoteDetailField[] = [
  {
    key: 'content_en',
    label: 'Content (EN)',
    type: 'richtext',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'content_id',
    label: 'Content (ID)',
    type: 'richtext',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
  },
  {
    key: 'author_id',
    label: 'Author',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'category_id',
    label: 'Category',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    style: { width: '100%', marginBottom: 2 },
    prefix: '/',
  },
];

export const DETAIL_PLACEHOLDER: Quote = {
  id: '',
  slug: '',
  content_en: null,
  content_id: null,
  image_id_url: null,
  image_en_url: null,
  author_id: null,
  description_en: null,
  description_id: null,
  category_id: null,
  created_at: '',
  updated_at: '',
  tags: [],
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: QuoteInputFIeld[] = [
  {
    key: 'content_en',
    label: 'Content (EN)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  {
    key: 'content_id',
    label: 'Content (ID)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  {
    key: 'author_id',
    label: 'Author',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
    optionProps: {
      entity: 'author',
      label: 'name_en',
    },
  },
  {
    key: 'category_id',
    label: 'Category',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    prefix: IndonesiaIcon,
    optionProps: {
      entity: 'category',
      label: 'name_en',
    },
  },
  {
    key: 'tags',
    label: 'Tags',
    type: 'autocomplete',
    style: { width: '100%', marginBottom: 2 },
    prefix: IndonesiaIcon,
    optionProps: {
      entity: 'tag',
      label: 'name_en',
      isMultiple: true,
    },
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    style: { width: '100%', marginBottom: 2 },
    prefix: '/',
  },
  {
    key: 'description_en',
    label: 'Description (EN)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  {
    key: 'description_id',
    label: 'Description (ID)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  // {
  //   key: 'image_en_url',
  //   label: 'Image (EN)',
  //   type: 'text',
  //   style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  //   prefix: EnglishIcon,
  // },
  // {
  //   key: 'image_id_url',
  //   label: 'Image (ID)',
  //   type: 'text',
  //   style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
  //   prefix: IndonesiaIcon,
  // },
];

export const INPUT_VARIABLE: QuoteVariables = {
  slug: '',
  content_id: null,
  content_en: null,
  image_id_url: null,
  image_en_url: null,
  author_id: null,
  description_en: null,
  description_id: null,
  category_id: null,
  tags: [],
};
// ================================================================
