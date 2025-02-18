import type { Filter } from '../shared/types';
import type { LogFilter, LogField, LogVariable } from './types';

export const PAGE_TYPE = 'log';
export const HOME_PAGE_TITLE = 'Logs';
export const DETAIL_PAGE_TITLE = 'Log Detail';

export const INITIAL_FILTER_STATE: Filter<LogFilter>[] = [
  {
    label: 'Admin Name',
    key: 'admin',
    value: '',
  },
  {
    label: 'Action Type',
    key: 'action',
    value: '',
  },
  {
    label: 'Entity',
    key: 'entity',
    value: '',
  },
];

export const VALUE_PLACEHOLDER: LogVariable = {
  id: '',
  admin: '',
  action: '',
  entity: '',
  dataId: '',
  dataNew: '',
  dataOld: '',
  createdAt: null,
  updatedAt: null,
};

export const DETAIL_FIELDS: LogField[] = [
  {
    key: 'admin',
    label: 'Admin Name',
    type: 'text',
  },
  {
    key: 'entity',
    label: 'Entity Name',
    type: 'text',
  },
  {
    key: 'action',
    label: 'Action Type',
    type: 'text',
  },
  {
    key: 'dataId',
    label: 'Data ID',
    type: 'text',
  },
  {
    key: 'dataNew',
    label: 'Updated Value',
    type: 'text',
  },
  {
    key: 'dataOld',
    label: 'Old Value',
    type: 'text',
  },
];
