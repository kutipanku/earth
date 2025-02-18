import type { Log, LogVariable } from './types';

export const convertToVariable = (log: Log): LogVariable => ({
  id: log.id,
  admin: log.admin.name,
  action: log.action,
  entity: log.entity,
  dataId: log.data.id,
  dataNew: log.data.new,
  dataOld: log.data.old,
  createdAt: log.metadata.createdAt,
  updatedAt: null,
});
