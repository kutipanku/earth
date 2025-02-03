import { finOne, updateOne } from '@backend/repository/database/profession';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Profession } from '@backend/entity/profession/type';

interface Props {
  id: string;
  sessionToken?: string;
  data: Profession;
}

const editProfession = async (props: Props) => {
  const { id, sessionToken, data } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return { data: null, error: 'Unauthorized', status: 401 };
  }

  const profession = await finOne({
    where: {
      id,
    },
  });

  if (!profession || profession === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find profession to edit',
      errorFields: [],
    };

  type BodyKey = keyof typeof data;
  const requiredFields: BodyKey[] = ['name', 'slug'];

  const errorFields = requiredFields.filter((key) => !data[key]);

  if (errorFields.length || !data.name || !data.slug) {
    return {
      status: 404,
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      errorFields,
    };
  }

  const result = await updateOne({
    where: {
      id,
    },
    data: {
      slug: data.slug,
      name_en: data.name.eng ?? '',
      name_id: data.name.ind ?? '',
      ...(data.icon && { icon: data.icon }),
    },
  });

  if (result.status === 200)
    saveToLog({
      action: 'update',
      entity: 'profession',
      userId,
      dataId: id,
      newData: JSON.stringify(result),
      oldData: JSON.stringify(profession),
    });

  return {
    data: result.data,
    error: result.error,
    fields: result.errorFields,
    status: result.status,
  };
};

export default editProfession;
