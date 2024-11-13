import { createOne } from '@/backend/repository/database/nationality';
import type { CreateOneProps } from '@/backend/repository/database/nationality/types';

import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

interface Props extends CreateOneProps {
  sessionToken?: string;
}

const addNewNationality = async (props: Props) => {
  const { sessionToken, payload } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return [{ data: null, error: 'Unauthorized' }, { status: 401 }];
  }

  const result = await createOne({ payload });

  if (result.status === 201)
    saveToLog({
      action: 'create',
      entity: 'nationality',
      userId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return [
    { data: result.data, error: result.error, fields: result.errorFields },
    { status: result.status },
  ];
};

export default addNewNationality;
