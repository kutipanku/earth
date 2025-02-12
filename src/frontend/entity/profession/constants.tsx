import type { Filter } from '../shared/types';
import type {
  ProfessionField,
  ProfessionVariable,
  ProfessionFilter,
} from './types';

export const PAGE_TYPE = 'profession';
export const HOME_PAGE_TITLE = 'Professions';
export const HOME_PAGE_REDIRECT_ADD = 'Add Profession';
export const DETAIL_PAGE_TITLE = 'Profession Detail';
export const ADD_PAGE_TITLE = 'Add Profession';
export const EDIT_PAGE_TITLE = 'Edit Profession';

export const INITIAL_FILTER_STATE: Filter<ProfessionFilter>[] = [
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

export const VALUE_PLACEHOLDER: ProfessionVariable = {
  nameEng: '',
  nameInd: '',
  slug: '',
  id: null,
  icon: null,
  createdAt: null,
  updatedAt: null,
};

export const DETAIL_FIELDS: ProfessionField[] = [
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
];

export const INPUT_FIELDS: ProfessionField[] = [
  {
    key: 'nameEng',
    label: 'Name (EN)',
    type: 'text',
    prefix: 'english_icon',
  },
  {
    key: 'nameInd',
    label: 'Name (ID)',
    type: 'text',
    prefix: 'indonesia_icon',
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    prefix: '/',
  },
];
