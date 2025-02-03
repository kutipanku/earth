import { createOne } from '@backend/repository/database/nationality';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Nationality } from '@backend/entity/nationality/type';

interface Props {
  data: Nationality;
  sessionToken?: string;
}

const addNewNationality = async (props: Props) => {
  const { sessionToken, data } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return { data: null, error: 'Unauthorized', status: 401 };
  }

  type BodyKey = keyof typeof data;
  const requiredFields: BodyKey[] = ['name', 'slug'];

  const errorFields = requiredFields.filter((key) => !data[key]);

  if (errorFields.length || !data.name || !data.slug) {
    return {
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      fields: errorFields,
      status: 404,
    };
  }

  const result = await createOne({
    data: {
      slug: data.slug,
      name_en: data.name.eng ?? '',
      name_id: data.name.ind ?? '',
      ...(data.flag && { flag: data.flag }),
    },
  });

  if (result.status === 201)
    saveToLog({
      action: 'create',
      entity: 'nationality',
      userId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return { data: result.data, error: result.error, status: result.status };
};

export default addNewNationality;
