import type { Filter } from '../shared/types';
import type { TagField, TagVariable, TagFilter } from './types';

export const PAGE_TYPE = 'tag';
export const HOME_PAGE_TITLE = 'Tags';
export const HOME_PAGE_REDIRECT_ADD = 'Add Tag';
export const DETAIL_PAGE_TITLE = 'Tag Detail';
export const ADD_PAGE_TITLE = 'Add Tag';
export const EDIT_PAGE_TITLE = 'Edit Tag';

export const INITIAL_FILTER_STATE: Filter<TagFilter>[] = [
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

export const VALUE_PLACEHOLDER: TagVariable = {
  nameEng: '',
  nameInd: '',
  slug: '',
  id: null,
  descriptionEng: null,
  descriptionInd: null,
  createdAt: null,
  updatedAt: null,
};

export const DETAIL_FIELDS: TagField[] = [
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

export const INPUT_FIELDS: TagField[] = [
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
