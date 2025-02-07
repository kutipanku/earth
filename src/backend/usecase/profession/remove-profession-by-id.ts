import { deleteOne } from '@backend/repository/database/profession';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

interface Props {
  id: string;
  sessionToken?: string;
}

const removeProfessionById = async (props: Props) => {
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

  // Begin profession deletion
  const result = await deleteOne({
    id: props.id,
  });

  // Capture profession deletion to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'delete',
      entity: 'profession',
      userId,
      dataId: props.id,
      newData: JSON.stringify({}),
      oldData: JSON.stringify(result.data),
    });

  return result;
};

export default removeProfessionById;
