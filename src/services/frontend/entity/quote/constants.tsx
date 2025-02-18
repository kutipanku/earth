import type { Filter } from '../shared/types';
import type { QuoteFilter, QuoteVariable, QuoteField } from './types';

export const PAGE_TYPE = 'quote';
export const HOME_PAGE_TITLE = 'Quotes';
export const HOME_PAGE_REDIRECT_ADD = 'Add Quote';
export const DETAIL_PAGE_TITLE = 'Quote Detail';
export const ADD_PAGE_TITLE = 'Add Quote';
export const EDIT_PAGE_TITLE = 'Edit Quote';

export const INITIAL_FILTER_STATE: Filter<QuoteFilter>[] = [
  {
    label: 'Content',
    key: 'content',
    value: '',
  },
];

export const VALUE_PLACEHOLDER: QuoteVariable = {
  id: '',
  slug: '',
  contentEng: null,
  contentInd: null,
  imageUrlEng: null,
  imageUrlInd: null,
  descriptionEng: null,
  descriptionInd: null,
  author: null,
  category: null,
  tags: null,
  createdAt: '',
  updatedAt: '',
};

export const DETAIL_FIELDS: QuoteField[] = [
  {
    key: 'contentEng',
    label: 'Content (EN)',
    type: 'richtext',
  },
  {
    key: 'contentInd',
    label: 'Content (ID)',
    type: 'richtext',
  },
  {
    key: 'author',
    label: 'Author',
    type: 'text',
  },
  {
    key: 'category',
    label: 'Category',
    type: 'text',
  },
  {
    key: 'tags',
    label: 'Tag',
    type: 'text',
  },
  {
    key: 'slug',
    label: 'Slug',
    type: 'text',
    prefix: '/',
  },
];

export const INPUT_FIELDS: QuoteField[] = [
  {
    key: 'contentEng',
    label: 'Content (EN)',
    type: 'richtext',
  },
  {
    key: 'contentInd',
    label: 'Content (ID)',
    type: 'richtext',
  },
  {
    key: 'author',
    label: 'Author',
    type: 'autocomplete',
    optionProps: {
      entity: 'author',
      label: 'name',
    },
  },
  {
    key: 'category',
    label: 'Category',
    type: 'autocomplete',
    optionProps: {
      entity: 'category',
      label: 'name',
    },
  },
  {
    key: 'tags',
    label: 'Tags',
    type: 'autocomplete',
    optionProps: {
      entity: 'tag',
      label: 'name',
      isMultiple: true,
    },
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
