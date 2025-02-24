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
  // Check for authorization
  const { isAuthorized, userId: adminId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { success: false, status: 401, data: null, error: 'Unauthorized' };
  }

  // Check for data existence
  const author = await finOne({
    id: props.id,
  });
  if (!author || author === null)
    return {
      success: false,
      status: 404,
      data: null,
      error: 'Unable to find author to edit',
      fields: [],
    };

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

  // Begin author update
  const result = await updateOne(props.data);

  // Capture author modification to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'update',
      entity: 'author',
      adminId,
      dataId: props.id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(author.data),
    });

  return { ...result, fields: [] };
};

export default editAuthor;
