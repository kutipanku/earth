import type { Log, LogVariable } from '@frontend/entity/log/types';
import type { GetLog, GetLogs } from './types';

type GetLogResponseData = GetLog['response']['data'];
type GetLogsResponseDataList = GetLogs['response']['data']['list'];

export const constructOwnSystemFieldData = (
  externalData: GetLogResponseData
) => {
  if (externalData === null) return null;

  const internalData: LogVariable = {
    id: externalData.id,
    admin: externalData.admin?.name || '',
    action: externalData.action,
    entity: externalData.entity,
    dataId: externalData.data.id,
    dataNew: externalData.data.new,
    dataOld: externalData.data.old,
    createdAt: externalData.metadata?.created_at || '',
    updatedAt: null,
  };

  return internalData;
};

export const constructOwnSystemRowData = (
  externalDataItems: GetLogsResponseDataList
) => {
  const internalDataItems: Log[] = externalDataItems.map((externalData) => {
    return {
      id: externalData.id,
      action: externalData.action,
      entity: externalData.entity,
      data: externalData.data,
      admin:
        externalData.admin === null
          ? {
              id: '',
              name: '',
            }
          : {
              id: externalData.admin.id,
              name: externalData.admin.name,
            },
      metadata:
        externalData.metadata === null
          ? {
              createdAt: '',
              updatedAt: '',
            }
          : {
              createdAt: externalData.metadata.created_at,
              updatedAt: '',
            },
    };
  });

  return internalDataItems;
};
