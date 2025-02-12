import type { Filter } from '@frontend/entity/shared/types';
import type {
  AuthorDetail,
  AuthorDetailField,
  AuthorInputField,
  AuthorInput,
} from '@frontend/entity/author/types';
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
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
  },
  {
    key: 'profession',
    label: 'Profession',
    type: 'text',
    style: { width: '50%', marginBottom: 2, paddingLeft: 1 },
  },
  {
    key: 'descriptionEng',
    label: 'Description in English (EN)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  {
    key: 'descriptionInd',
    label: 'Description in Bahasa (ID)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
];

export const DETAIL_PLACEHOLDER: AuthorDetail = {
  id: '',
  name: '',
  dob: null,
  descriptionEng: '',
  descriptionInd: '',
  pictureUrl: null,
  slug: '',
  nationality: null,
  profession: null,
  createdAt: '',
  updatedAt: '',
};
// ================================================================

// Update Properties
export const INPUT_FIELDS: AuthorInputField[] = [
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
    key: 'nationality',
    label: 'Nationality',
    type: 'autocomplete',
    style: { width: '50%', marginBottom: 2, paddingRight: 1 },
    optionProps: {
      entity: 'nationality',
      label: 'name_en',
    },
  },
  {
    key: 'profession',
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
    key: 'descriptionEng',
    label: 'Description in English (EN)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
  {
    key: 'descriptionInd',
    label: 'Description in Bahasa (ID)',
    type: 'richtext',
    style: { width: '100%', marginBottom: 2 },
  },
];

export const INPUT_VARIABLE: AuthorInput = {
  name: '',
  slug: '',
  nationality: null,
  profession: null,
  dob: null,
  descriptionEng: null,
  descriptionInd: null,
  pictureUrl: null,
};
// ================================================================
