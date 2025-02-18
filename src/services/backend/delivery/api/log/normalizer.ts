import type { Log } from '@backend/entity/log/type';
import type { GetLog, GetLogs } from './contract';

type ResponseGetLog = GetLog['response']['data'];
type ResponseGetLogsList = GetLogs['response']['data']['list'];

export const normalizeOne = (item: Log | null) => {
  if (item === null) return null;

  const normalizedItem: ResponseGetLog = {
    id: item.id,
    action: item.action,
    entity: item.entity,
    data: {
      id: item.data_id,
      old: item.data.old,
      new: item.data.new,
    },
    admin: {
      id: item.admin.id,
      name: item.admin.name,
    },
    metadata: item.metadata && {
      created_at: item.metadata.created_at.toISOString(),
      updated_at: item.metadata.created_at.toISOString(),
    },
  };

  return normalizedItem;
};

export const normalizeForList = (items: Log[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetLogsList = items.map((item) => ({
    id: item.id,
    action: item.action,
    entity: item.entity,
    data: {
      id: item.data_id,
      old: item.data.old,
      new: item.data.new,
    },
    admin: {
      id: item.admin.id,
      name: item.admin.name,
    },
    metadata: item.metadata && {
      created_at: item.metadata.created_at.toISOString(),
      updated_at: item.metadata.created_at.toISOString(),
    },
  }));

  return normalizedItem;
};
