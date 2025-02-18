import type { Filter } from '../shared/types';
import type { Admin, AdminFilter, AdminField } from './types';

export const PAGE_TYPE = 'admin';
export const HOME_PAGE_TITLE = 'Admins';
export const DETAIL_PAGE_TITLE = 'Admin Detail';

export const INITIAL_FILTER_STATE: Filter<AdminFilter>[] = [
  {
    label: 'Name',
    key: 'name',
    value: '',
  },
];

export const VALUE_PLACEHOLDER: Admin = {
  id: '',
  name: '',
  email: '',
};

export const DETAIL_FIELDS: AdminField[] = [
  {
    key: 'name',
    label: 'Name',
    type: 'text',
  },
  {
    key: 'email',
    label: 'Email',
    type: 'text',
  },
];
