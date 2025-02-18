import type { Filter } from '../shared/types';
import type { CategoryField, CategoryFilter, CategoryVariable } from './types';

export const PAGE_TYPE = 'category';
export const HOME_PAGE_TITLE = 'Categories';
export const HOME_PAGE_REDIRECT_ADD = 'Add Category';
export const DETAIL_PAGE_TITLE = 'Category Detail';
export const ADD_PAGE_TITLE = 'Add Category';
export const EDIT_PAGE_TITLE = 'Edit Category';

export const INITIAL_FILTER_STATE: Filter<CategoryFilter>[] = [
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

export const VALUE_PLACEHOLDER: CategoryVariable = {
  nameEng: '',
  nameInd: '',
  slug: '',
  id: null,
  descriptionEng: null,
  descriptionInd: null,
  createdAt: null,
  updatedAt: null,
};

export const DETAIL_FIELDS: CategoryField[] = [
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
    key: 'descriptionEng',
    label: 'Description (EN)',
    type: 'richtext',
  },
  {
    key: 'descriptionInd',
    label: 'Description (ID)',
    type: 'richtext',
  },
];

export const INPUT_FIELDS: CategoryField[] = [
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
  {
    key: 'descriptionEng',
    label: 'Description (EN)',
    type: 'richtext',
  },
  {
    key: 'descriptionInd',
    label: 'Description (ID)',
    type: 'richtext',
  },
];
