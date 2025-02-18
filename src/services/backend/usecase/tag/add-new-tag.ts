import { createOne } from '@backend/repository/database/tag';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Tag } from '@backend/entity/tag/type';

interface Props {
  data: Tag;
  sessionToken?: string;
}

const addNewTag = async (props: Props) => {
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

  // Begin tag creation
  const result = await createOne(props.data);

  // Capture tag creation to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'create',
      entity: 'tag',
      userId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return { ...result, fields: [] };
};

export default addNewTag;
