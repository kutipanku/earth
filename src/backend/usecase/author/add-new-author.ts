import { createOne } from '@backend/repository/database/author/create';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Author } from '@backend/entity/author/type';

interface Props {
  data: Author;
  sessionToken?: string;
}

const addNewAuthor = async (props: Props) => {
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
      name: data.name,
      slug: data.slug,
      ...(data.dob && { dob: data.dob.toISOString() }),
      ...(data.description.eng && { description_en: data.description.eng }),
      ...(data.description.ind && { description_id: data.description.ind }),
      ...(data.picture_url && { picture_url: data.picture_url }),
      ...(data.ids?.profession_id && { profession_id: data.ids.profession_id }),
      ...(data.ids?.nationality_id && {
        nationality_id: data.ids.nationality_id,
      }),
    },
  });

  if (result.status === 201)
    saveToLog({
      action: 'create',
      entity: 'author',
      userId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return {
    data: result.data,
    error: result.error,
    status: result.status,
  };
};

export default addNewAuthor;
