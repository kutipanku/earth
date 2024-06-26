import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IndonesiaIcon from '@/public/icons/id.png';
import EnglishIcon from '@/public/icons/gb.png';
import type { Filter, TableRowProps } from '@/entity/ui/type';
import type {
  Nationality,
  NationalityDetailField,
  NationalityInputFIeld,
  NationalityVariables,
} from '@/entity/nationality/type';
// ================================================================

// Page Meta
export const PAGE_TYPE = 'nationality';
export const HOME_PAGE_TITLE = 'Nationalities';
export const HOME_PAGE_REDIRECT_ADD = 'Add Nationality';
export const DETAIL_PAGE_TITLE = 'Nationality Detail';
export const ADD_PAGE_TITLE = 'Add Nationality';
export const EDIT_PAGE_TITLE = 'Edit Nationality';
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
  callbackFunction: (type: string, dataRow: TableRowProps<Nationality>) => void
) => [
  { field: 'name_en', headerName: 'Name (EN)', width: 300, sortable: false },
  { field: 'name_id', headerName: 'Name (ID)', width: 300, sortable: false },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Nationality>) => <>/{params.row.slug}</>,
  },
  { field: 'flag', headerName: 'Flag', width: 200, sortable: false },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Nationality>) => (
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
export const DETAIL_FIELDS: NationalityDetailField[] = [
  {
    key: 'name_en',
    label: 'Name (EN)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'name_id',
    label: 'Name (ID)',
    type: 'text',
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

export const DETAIL_PLACEHOLDER: Nationality = {
  flag: '',
  id: '',
  name_en: '',
  name_id: '',
  slug: '',
  created_at: '',
  updated_at: '',
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: NationalityInputFIeld[] = [
  {
    key: 'name_en',
    label: 'Name (EN)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
    prefix: EnglishIcon,
  },
  {
    key: 'name_id',
    label: 'Name (ID)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    prefix: IndonesiaIcon,
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    style: { width: '100%', marginBottom: 2 },
    prefix: '/',
  },
];

export const INPUT_VARIABLE: NationalityVariables = {
  name_id: '',
  name_en: '',
  slug: '',
  flag: '',
};
// ================================================================
