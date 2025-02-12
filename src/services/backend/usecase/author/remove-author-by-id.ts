import { deleteOne } from '@backend/repository/database/author/delete';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

interface Props {
  id: string;
  sessionToken?: string;
}

const removeAuthorById = async (props: Props) => {
  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { success: false, status: 401, data: null, error: 'Unauthorized' };
  }

  // Check for missing params
  if (!props.id) {
    return { success: false, status: 404, data: null, error: 'Missing Id' };
  }

  // Begin nationality deletion
  const result = await deleteOne({
    id: props.id,
  });

  // Capture profession deletion to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'delete',
      entity: 'author',
      userId,
      dataId: props.id,
      newData: JSON.stringify({}),
      oldData: JSON.stringify(result.data),
    });

  return result;
};

export default removeAuthorById;
