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
  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { success: false, data: null, error: 'Unauthorized', status: 401 };
  }

  // Check for data existence
  const category = await finOne({
    id: props.id,
  });
  if (!category || category === null)
    return {
      success: false,
      status: 404,
      data: null,
      error: 'Unable to find category to edit',
      fields: [],
    };

  // Check for required fields
  type BodyKey = keyof typeof props.data;
  const requiredFields: BodyKey[] = ['name', 'description', 'slug'];
  const errorFields = requiredFields.filter((key) => !props.data[key]);
  if (
    errorFields.length ||
    !props.data.name ||
    !props.data.description ||
    !props.data.slug
  ) {
    return {
      success: false,
      status: 404,
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      fields: errorFields as string[],
    };
  }

  // Begin category update
  const result = await updateOne(props.data);

  // Capture category modification to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'update',
      entity: 'category',
      userId,
      dataId: props.id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(category.data),
    });

  return { ...result, fields: [] };
};

export default editCategory;
