import type { Filter } from '../shared/types';
import type {
  NationalityField,
  NationalityVariable,
  NationalityFilter,
} from './types';

export const PAGE_TYPE = 'nationality';
export const HOME_PAGE_TITLE = 'Nationalities';
export const HOME_PAGE_REDIRECT_ADD = 'Add Nationality';
export const DETAIL_PAGE_TITLE = 'Nationality Detail';
export const ADD_PAGE_TITLE = 'Add Nationality';
export const EDIT_PAGE_TITLE = 'Edit Nationality';

export const INITIAL_FILTER_STATE: Filter<NationalityFilter>[] = [
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

export const VALUE_PLACEHOLDER: NationalityVariable = {
  nameEng: '',
  nameInd: '',
  slug: '',
  id: null,
  flag: null,
  createdAt: null,
  updatedAt: null,
};

export const DETAIL_FIELDS: NationalityField[] = [
  {
    key: 'nameEng',
    label: 'Name (EN)',
    type: 'text',
  },
  {
    key: 'nameInd',
    label: 'Name (ID)',
    type: 'text',
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    prefix: '/',
  },
  {
    key: 'flag',
    label: 'Flag',
    type: 'text',
  },
];

export const INPUT_FIELDS: NationalityField[] = [
  {
    key: 'nameEng',
    label: 'Name (EN)',
    type: 'text',
    prefix: 'static_flag_english',
    required: true,
  },
  {
    key: 'nameInd',
    label: 'Name (ID)',
    type: 'text',
    prefix: 'static_flag_indonesia',
    required: true,
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    prefix: '/',
    required: true,
  },
  {
    key: 'flag',
    label: 'Flag',
    type: 'text',
    required: false,
  },
];
