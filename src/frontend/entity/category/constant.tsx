import type { Filter } from '@/frontend/entity/shared/types';
import type {
  Category,
  CategoryDetailField,
  CategoryInputFIeld,
  CategoryVariables,
} from '@/frontend/entity/category/types';
// ================================================================

// Page Meta
export const PAGE_TYPE = 'category';
export const HOME_PAGE_TITLE = 'Categories';
export const HOME_PAGE_REDIRECT_ADD = 'Add Category';
export const DETAIL_PAGE_TITLE = 'Category Detail';
export const ADD_PAGE_TITLE = 'Add Category';
export const EDIT_PAGE_TITLE = 'Edit Category';
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
export const DETAIL_FIELDS: CategoryDetailField[] = [
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

export const DETAIL_PLACEHOLDER: Category = {
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
export const INPUT_FIELDS: CategoryInputFIeld[] = [
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

export const INPUT_VARIABLE: CategoryVariables = {
  nameId: '',
  nameEn: '',
  slug: '',
  descriptionEn: null,
  descriptionId: null,
};
// ================================================================
