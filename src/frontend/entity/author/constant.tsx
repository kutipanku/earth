import type { Filter } from '@/frontend/entity/core/types';
import type {
  Author,
  AuthorDetailField,
  AuthorInputFIeld,
  AuthorVariables,
} from '@/frontend/entity/author/types';
// ================================================================

// Page Meta
export const PAGE_TYPE = 'author';
export const HOME_PAGE_TITLE = 'Authors';
export const HOME_PAGE_REDIRECT_ADD = 'Add Author';
export const DETAIL_PAGE_TITLE = 'Author Detail';
export const ADD_PAGE_TITLE = 'Add Author';
export const EDIT_PAGE_TITLE = 'Edit Author';
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
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    prefix: '/',
  },
  {
    key: 'nationality',
    label: 'Nationality',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'profession',
    label: 'Profession',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
  },
  {
    key: 'descriptionEn',
    label: 'Description in English (EN)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  {
    key: 'descriptionId',
    label: 'Description in Bahasa (ID)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
];

export const DETAIL_PLACEHOLDER: Author = {
  id: '',
  name: '',
  dob: null,
  descriptionEn: '',
  descriptionId: '',
  pictureUrl: null,
  slug: '',
  nationalityId: null,
  nationality: {
    id: '',
    nameEn: '',
  },
  professionId: null,
  profession: {
    id: '',
    nameEn: '',
  },
  createdAt: '',
  updatedAt: '',
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: AuthorInputFIeld[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    required: true,
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    prefix: '/',
  },
  {
    key: 'nationalityId',
    label: 'Nationality',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
    optionProps: {
      entity: 'nationality',
      label: 'name_en',
    },
  },
  {
    key: 'professionId',
    label: 'Profession',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
    optionProps: {
      entity: 'profession',
      label: 'name_en',
    },
  },
  {
    key: 'pictureUrl',
    label: 'Picture',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'dob',
    label: 'Date of Birth',
    type: 'date',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
  },
  {
    key: 'descriptionEn',
    label: 'Description in English (EN)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  {
    key: 'descriptionId',
    label: 'Description in Bahasa (ID)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
];

export const INPUT_VARIABLE: AuthorVariables = {
  name: '',
  slug: '',
  nationalityId: '',
  professionId: '',
  dob: null,
  descriptionEn: null,
  descriptionId: null,
  pictureUrl: null,
};
// ================================================================
