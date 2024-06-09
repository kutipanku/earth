import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IndonesiaIcon from '@/public/icons/id.png';
import EnglishIcon from '@/public/icons/gb.png';
import type { Filter, TableRowProps } from '@/entity/ui/type';
import type {
  Tag,
  TagDetailField,
  TagInputFIeld,
  TagVariables,
} from '@/entity/tag/type';
// ================================================================

// Page Meta
export const PAGE_TYPE = 'tag';
export const HOME_PAGE_TITLE = 'Tags';
export const HOME_PAGE_REDIRECT_ADD = 'Add Tag';
export const DETAIL_PAGE_TITLE = 'Tag Detail';
export const ADD_PAGE_TITLE = 'Add Tag';
export const EDIT_PAGE_TITLE = 'Edit Tag';
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
  callbackFunction: (type: string, dataRow: TableRowProps<Tag>) => void
) => [
  { field: 'name_en', headerName: 'Name (EN)', width: 300, sortable: false },
  { field: 'name_id', headerName: 'Name (ID)', width: 300, sortable: false },
  {
    field: 'slug',
    headerName: 'Slug',
    width: 300,
    sortable: false,
    renderCell: (params: TableRowProps<Tag>) => <>/{params.row.slug}</>,
  },
  {
    field: 'action',
    headerName: 'Actions',
    sortable: false,
    width: 370,
    renderCell: (params: TableRowProps<Tag>) => (
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
export const DETAIL_FIELDS: TagDetailField[] = [
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

export const DETAIL_PLACEHOLDER: Tag = {
  id: '',
  name_en: '',
  name_id: '',
  slug: '',
  created_at: '',
  updated_at: '',
  description_en: null,
  description_id: null,
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: TagInputFIeld[] = [
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

export const INPUT_VARIABLE: TagVariables = {
  name_id: '',
  name_en: '',
  slug: '',
  description_en: null,
  description_id: null,
};
// ================================================================
