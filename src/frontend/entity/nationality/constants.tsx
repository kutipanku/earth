import type { Filter } from '@/frontend/entity/core/types';
import type {
  NationalityDetail,
  NationalityDetailField,
  NationalityInputField,
  NationalityVariables,
} from '@/frontend/entity/nationality/types';
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

// Detail Properties
export const DETAIL_FIELDS: NationalityDetailField[] = [
  {
    key: 'nameEng',
    label: 'Name (EN)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'nameInd',
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

export const DETAIL_PLACEHOLDER: NationalityDetail = {
  flag: '',
  id: '',
  nameEng: '',
  nameInd: '',
  slug: '',
  createdAt: '',
  updatedAt: '',
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: NationalityInputField[] = [
  {
    key: 'nameEng',
    label: 'Name (EN)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
    prefix: 'static_flag_english',
  },
  {
    key: 'nameInd',
    label: 'Name (ID)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    prefix: 'static_flag_indonesia',
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
  nameEng: '',
  nameInd: '',
  slug: '',
  flag: '',
};
// ================================================================
