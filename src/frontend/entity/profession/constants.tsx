import type { Filter } from '@/frontend/entity/shared/types';
import type {
  ProfessionDetail,
  ProfessionDetailField,
  ProfessionInputFIeld,
  ProfessionVariables,
} from '@frontend/entity/profession/types';
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

// Detail Properties
export const DETAIL_FIELDS: ProfessionDetailField[] = [
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

export const DETAIL_PLACEHOLDER: ProfessionDetail = {
  id: '',
  nameEng: '',
  nameInd: '',
  slug: '',
  icon: '',
  createdAt: '',
  updatedAt: '',
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: ProfessionInputFIeld[] = [
  {
    key: 'nameEng',
    label: 'Name (EN)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
    prefix: 'english_icon',
  },
  {
    key: 'nameInd',
    label: 'Name (ID)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    prefix: 'indonesia_icon',
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
  nameInd: '',
  nameEng: '',
  slug: '',
  icon: '',
};
// ================================================================
