import { finOne, updateOne } from '@backend/repository/database/author';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Author } from '@backend/entity/author/type';

interface Props {
  id: string;
  sessionToken?: string;
  data: Author;
}

const editAuthor = async (props: Props) => {
  const { id, sessionToken, data } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return { data: null, error: 'Unauthorized', status: 401 };
  }

  const author = await finOne({
    where: {
      id,
    },
  });

  if (!author || author === null)
    return {
      data: null,
      error: 'Unable to find author to edit',
      fields: [],
      status: 404,
    };

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

  const result = await updateOne({
    where: {
      id,
    },
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

  if (result.status === 200)
    saveToLog({
      action: 'update',
      entity: 'author',
      userId,
      dataId: id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(author.data),
    });

  return {
    data: result.data,
    error: result.error,
    fields: result.errorFields,
    status: result.status,
  };
};

export default editAuthor;
