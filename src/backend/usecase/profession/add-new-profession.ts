import { createOne } from '@backend/repository/database/profession';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Profession } from '@backend/entity/profession/type';

interface Props {
  data: Profession;
  sessionToken?: string;
}

const addNewProfession = async (props: Props) => {
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
      ...(data.icon && { icon: data.icon }),
    },
  });

  if (result.status === 201)
    saveToLog({
      action: 'create',
      entity: 'profession',
      userId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return {
    data: result.data,
    error: result.error,
    fields: result.errorFields,
    status: result.status,
  };
};

export default addNewProfession;
