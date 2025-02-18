import { createOne } from '@backend/repository/database/category';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Category } from '@backend/entity/category/type';

interface Props {
  data: Category;
  sessionToken?: string;
}

const addNewCategory = async (props: Props) => {
  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { success: false, status: 401, data: null, error: 'Unauthorized' };
  }

  // Check for required fields
  type BodyKey = keyof typeof props.data;
  const requiredFields: BodyKey[] = ['name', 'slug'];
  const errorFields = requiredFields.filter((key) => !props.data[key]);
  if (errorFields.length || !props.data.name || !props.data.slug) {
    return {
      success: false,
      status: 404,
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      fields: errorFields as string[],
    };
  }

  // Begin category creation
  const result = await createOne(props.data);

  // Capture category creation to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'create',
      entity: 'category',
      userId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return { ...result, fields: [] };
};

export default addNewCategory;
