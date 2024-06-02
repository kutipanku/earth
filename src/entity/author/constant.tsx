import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import type { Filter } from '@/entity/ui/type';
import type {
  AuthorDetailField,
  AuthorInputFIeld,
  AuthorVariables,
} from '@/entity/author/type';

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
export const PAGE_TYPE = 'author';
export const HOME_PAGE_TITLE = 'Authors';
export const HOME_PAGE_REDIRECT_ADD = 'Add Author';
export const DETAIL_PAGE_TITLE = 'Author Detail';
export const ADD_PAGE_TITLE = 'Add Author';
export const EDIT_PAGE_TITLE = 'Edit Author';
export const DETAIL_FIELDS: AuthorDetailField[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    style: { width: '100%', marginBottom: 2 },
    prefix: '/',
  },
];

export const INPUT_VARIABLE: AuthorVariables = {
  name: '',
  slug: '',
  nationality_id: '',
  profession_id: '',
  dob: null,
  description_en: null,
  description_id: null,
  picture_url: null,
};

export const INPUT_FIELDS: AuthorInputFIeld[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'textfield',
    required: true,
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'textfield',
    required: true,
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    prefix: '/',
  },
  {
    key: 'nationality_id',
    label: 'Nationality',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
    optionProps: {
      entity: 'nationality',
      label: 'name_en',
    },
  },
  {
    key: 'profession_id',
    label: 'Profession',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    optionProps: {
      entity: 'profession',
      label: 'name_en',
    },
  },
  {
    key: 'picture_url',
    label: 'Picture',
    type: 'textfield',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'description_en',
    label: 'Description in English (EN)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  {
    key: 'description_id',
    label: 'Description in Bahasa (ID)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
];

export const TABLE_HEADER = (
  callbackFunction: (type: string, dataRow: any) => void
) => [
  { field: 'name', headerName: 'Name', width: 300, sortable: false },
  { field: 'slug', headerName: 'Slug', width: 300, sortable: false },
  {
    field: 'nationality',
    headerName: 'Nationality',
    width: 300,
    sortable: false,
    renderCell: (params: any) => {
      if (params.row.nationality === null) return '-';

      return <>{params.row.nationality.name_en}</>;
    },
  },
  {
    field: 'profession',
    headerName: 'Profession',
    width: 300,
    sortable: false,
    renderCell: (params: any) => {
      if (params.row.profession === null) return '-';

      return <>{params.row.profession.name_en}</>;
    },
  },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: any) => (
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
