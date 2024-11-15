import { updateOne } from '@/backend/repository/database/category';
import type { UpdateOneProps } from '@/backend/repository/database/category/types';

import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

interface Props extends UpdateOneProps {
  sessionToken?: string;
}

const editCategory = async (props: Props) => {
  const { id, sessionToken, payload } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return [{ data: null, error: 'Unauthorized' }, { status: 401 }];
  }

  const result = await updateOne({ id, payload });

  if (result.status === 200)
    saveToLog({
      action: 'update',
      entity: 'category',
      userId,
      dataId: id,
      newData: JSON.stringify(result.data?.new),
      oldData: JSON.stringify(result.data?.old),
    });

  return [
    { data: result.data, error: result.error, fields: result.errorFields },
    { status: result.status },
  ];
};

export default editCategory;
