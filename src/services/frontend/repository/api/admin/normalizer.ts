import type { Admin } from '@frontend/entity/admin/types';
import type { GetAdmin, GetAdmins } from './types';

type GetAdminResponseData = GetAdmin['response']['data'];
type GetAdminsResponseDataList = GetAdmins['response']['data']['list'];

export const constructOwnSystemData = (externalData: GetAdminResponseData) => {
  if (externalData === null) return null;

  const internalData: Admin = {
    id: externalData.id,
    name: externalData.name,
    email: externalData.email,
  };

  return internalData;
};

export const constructOwnSystemFieldData = (
  externalData: GetAdminResponseData
) => {
  if (externalData === null) return null;

  const internalData: Admin = {
    id: externalData.id,
    name: externalData.name,
    email: externalData.email,
  };

  return internalData;
};

export const constructOwnSystemRowData = (
  externalDataItems: GetAdminsResponseDataList
) => {
  const internalDataItems: Admin[] = externalDataItems.map((externalData) => {
    return {
      id: externalData.id,
      name: externalData.name,
      email: externalData.email,
    };
  });

  return internalDataItems;
};
