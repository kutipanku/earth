import type { Filter } from '../shared/types';
import type { AuthorFilter, AuthorVariable, AuthorField } from './types';

export const PAGE_TYPE = 'author';
export const HOME_PAGE_TITLE = 'Authors';
export const HOME_PAGE_REDIRECT_ADD = 'Add Author';
export const DETAIL_PAGE_TITLE = 'Author Detail';
export const ADD_PAGE_TITLE = 'Add Author';
export const EDIT_PAGE_TITLE = 'Edit Author';

export const INITIAL_FILTER_STATE: Filter<AuthorFilter>[] = [
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

export const VALUE_PLACEHOLDER: AuthorVariable = {
  name: '',
  slug: '',
  id: null,
  dob: null,
  descriptionEng: null,
  descriptionInd: null,
  pictureUrl: null,
  nationality: null,
  profession: null,
  createdAt: null,
  updatedAt: null,
};

export const DETAIL_FIELDS: AuthorField[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    prefix: '/',
  },
  {
    key: 'nationality',
    label: 'Nationality',
    type: 'text',
  },
  {
    key: 'profession',
    label: 'Profession',
    type: 'text',
  },
  {
    key: 'descriptionEng',
    label: 'Description in English (EN)',
    type: 'richtext',
  },
  {
    key: 'descriptionInd',
    label: 'Description in Bahasa (ID)',
    type: 'richtext',
  },
];

export const INPUT_FIELDS: AuthorField[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
    required: true,
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    required: true,
    prefix: '/',
  },
  {
    key: 'nationality',
    label: 'Nationality',
    type: 'autocomplete',
    optionProps: {
      entity: 'nationality',
      label: 'name_en',
    },
  },
  {
    key: 'profession',
    label: 'Profession',
    type: 'autocomplete',
    optionProps: {
      entity: 'profession',
      label: 'name_en',
    },
  },
  {
    key: 'pictureUrl',
    label: 'Picture',
    type: 'text',
  },
  {
    key: 'dob',
    label: 'Date of Birth',
    type: 'date',
  },
  {
    key: 'descriptionEng',
    label: 'Description in English (EN)',
    type: 'richtext',
  },
  {
    key: 'descriptionInd',
    label: 'Description in Bahasa (ID)',
    type: 'richtext',
  },
];
