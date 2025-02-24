import { finOne, updateOne } from '@backend/repository/database/tag';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Tag } from '@backend/entity/tag/type';

interface Props {
  id: string;
  sessionToken?: string;
  data: Tag;
}

const editTag = async (props: Props) => {
  // Check for authorization
  const { isAuthorized, userId: adminId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { success: false, status: 401, data: null, error: 'Unauthorized' };
  }

  // Check for data existence
  const tag = await finOne({
    id: props.id,
  });
  if (!tag || tag === null)
    return {
      success: false,
      status: 404,
      data: null,
      error: 'Unable to find tag to edit',
      errorFields: [],
    };

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

  // Begin tag update
  const result = await updateOne(props.data);

  // Capture tag modification to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'update',
      entity: 'tag',
      adminId,
      dataId: props.id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(tag.data),
    });

  return { ...result, fields: [] };
};

export default editTag;
