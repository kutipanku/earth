import { createOne } from '@backend/repository/database/nationality';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Nationality } from '@backend/entity/nationality/type';

interface Props {
  data: Nationality;
  sessionToken?: string;
}

const addNewNationality = async (props: Props) => {
  // Check for authorized account
  const { isAuthorized, userId: adminId } = await getAuthStatus({
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

  // Begin nationality creation
  const result = await createOne(props.data);

  // Capture nationality creation to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'create',
      entity: 'nationality',
      adminId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return { ...result, fields: [] };
};

export default addNewNationality;
