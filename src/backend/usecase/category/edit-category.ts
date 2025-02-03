import { finOne, updateOne } from '@/backend/repository/database/category';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Category } from '@backend/entity/category/type';

interface Props {
  id: string;
  sessionToken?: string;
  data: Category;
}

const editCategory = async (props: Props) => {
  const { id, sessionToken, data } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return { data: null, error: 'Unauthorized', status: 401 };
  }

  const category = await finOne({
    where: {
      id,
    },
  });

  if (!category || category === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find category to edit',
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
      description_en: data.description.eng ?? '',
      description_id: data.description.ind ?? '',
    },
  });

  if (result.status === 200)
    saveToLog({
      action: 'update',
      entity: 'category',
      userId,
      dataId: id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(category.data),
    });

  return {
    data: result.data,
    error: result.error,
    fields: result.errorFields,
    status: result.status,
  };
};

export default editCategory;
