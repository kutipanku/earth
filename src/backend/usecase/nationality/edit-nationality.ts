import { finOne, updateOne } from '@backend/repository/database/nationality';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Nationality } from '@backend/entity/nationality/type';

interface Props {
  id: string;
  sessionToken?: string;
  data: Nationality;
}

const editNationality = async (props: Props) => {
  const { id, sessionToken, data } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return { data: null, error: 'Unauthorized', status: 401 };
  }

  const nationality = await finOne({
    where: {
      id,
    },
  });

  if (!nationality || nationality === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find nationality to edit',
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
      ...(data.flag && { flag: data.flag }),
    },
  });

  if (result.status === 200)
    saveToLog({
      action: 'update',
      entity: 'nationality',
      userId,
      dataId: id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(nationality.data),
    });

  return {
    data: result.data,
    error: result.error,
    fields: result.errorFields,
    status: result.status,
  };
};

export default editNationality;
