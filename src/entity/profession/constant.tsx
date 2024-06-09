import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IndonesiaIcon from '@/public/icons/id.png';
import EnglishIcon from '@/public/icons/gb.png';
import type { Filter, TableRowProps } from '@/entity/ui/type';
import type {
  Profession,
  ProfessionDetailField,
  ProfessionInputFIeld,
  ProfessionVariables,
} from '@/entity/profession/type';
// ================================================================

// Page Meta
export const PAGE_TYPE = 'profession';
export const HOME_PAGE_TITLE = 'Professions';
export const HOME_PAGE_REDIRECT_ADD = 'Add Profession';
export const DETAIL_PAGE_TITLE = 'Profession Detail';
export const ADD_PAGE_TITLE = 'Add Profession';
export const EDIT_PAGE_TITLE = 'Edit Profession';
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
  callbackFunction: (type: string, dataRow: TableRowProps<Profession>) => void
) => [
  { field: 'name_en', headerName: 'Name (EN)', width: 300, sortable: false },
  { field: 'name_id', headerName: 'Name (ID)', width: 300, sortable: false },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Profession>) => <>/{params.row.slug}</>,
  },
  { field: 'icon', headerName: 'Icon', width: 200, sortable: false },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Profession>) => (
      <ButtonGroup variant='outlined' aria-label='text button group'>
        <Button
          onClick={() => callbackFunction('view', params)}
          startIcon={<VisibilityIcon />}
          size='small'
        >
          Detail
        </Button>
        <Button
          onClick={() => callbackFunction('edit', params)}
          startIcon={<EditIcon />}
          size='small'
        >
          Ubah
        </Button>
        <Button
          onClick={() => callbackFunction('delete', params)}
          startIcon={<DeleteForeverIcon />}
          size='small'
        >
          Hapus
        </Button>
      </ButtonGroup>
    ),
  },
];
// ================================================================

// Detail Properties
export const DETAIL_FIELDS: ProfessionDetailField[] = [
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

export const DETAIL_PLACEHOLDER: Profession = {
  id: '',
  name_en: '',
  name_id: '',
  slug: '',
  icon: '',
  created_at: '',
  updated_at: '',
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: ProfessionInputFIeld[] = [
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

export const INPUT_VARIABLE: ProfessionVariables = {
  name_id: '',
  name_en: '',
  slug: '',
  icon: '',
};
// ================================================================
