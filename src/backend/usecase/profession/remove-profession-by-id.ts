import { deleteOne } from '@/backend/repository/database/profession';

import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

interface Props {
  id: string;
  sessionToken?: string;
}

const removeProfessionById = async (props: Props) => {
  const { sessionToken, id } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return { data: null, error: 'Unauthorized', status: 401 };
  }

  // Check for missing params
  if (!id) {
    return { data: null, error: 'Missing Id', status: 404 };
  }

  const result = await deleteOne({
    where: {
      id,
    },
  });

  // Log for success only
  if (result.status === 200)
    saveToLog({
      action: 'delete',
      entity: 'profession',
      userId,
      dataId: id,
      newData: JSON.stringify({}),
      oldData: JSON.stringify(result.data),
    });

  return { data: result.data, error: result.error, status: result.status };
};

export default removeProfessionById;
