import { finOne, updateOne } from '@/backend/repository/database/author';

import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

interface Props {
  id: string;
  sessionToken?: string;
  data: {
    name?: string;
    slug?: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  };
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

  const payload: {
    name: string;
    slug: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  } = {
    name: data.name,
    slug: data.slug,
  };

  if (data.dob) payload.dob = new Date(data.dob).toISOString();
  if (data.description_en) payload.description_en = data.description_en;
  if (data.description_id) payload.description_id = data.description_id;
  if (data.picture_url) payload.picture_url = data.picture_url;
  if (data.nationality_id) payload.nationality_id = data.nationality_id;
  if (data.profession_id) payload.profession_id = data.profession_id;

  const result = await updateOne({
    where: {
      id,
    },
    data,
  });

  if (result.status === 200)
    saveToLog({
      action: 'update',
      entity: 'author',
      userId,
      dataId: id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(author),
    });

  return {
    data: result.data,
    error: result.error,
    fields: result.errorFields,
    status: result.status,
  };
};

export default editAuthor;
