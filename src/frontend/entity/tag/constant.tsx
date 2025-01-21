import type { Filter } from '@/frontend/entity/core/types';
import type {
  Tag,
  TagDetailField,
  TagInputFIeld,
  TagVariables,
} from '@/frontend/entity/tag/types';
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

// Detail Properties
export const DETAIL_FIELDS: TagDetailField[] = [
  {
    key: 'nameEn',
    label: 'Name (EN)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'nameId',
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
  nameEn: '',
  nameId: '',
  slug: '',
  createdAt: '',
  updatedAt: '',
  descriptionEn: null,
  descriptionId: null,
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: TagInputFIeld[] = [
  {
    key: 'nameEn',
    label: 'Name (EN)',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
    prefix: 'english_icon',
  },
  {
    key: 'nameId',
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

export const INPUT_VARIABLE: TagVariables = {
  nameId: '',
  nameEn: '',
  slug: '',
  descriptionEn: null,
  descriptionId: null,
};
// ================================================================
