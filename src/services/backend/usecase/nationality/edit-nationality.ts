import { finOne, updateOne } from '@backend/repository/database/nationality';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Nationality } from '@backend/entity/nationality/type';

interface Props {
  id: string;
  sessionToken?: string;
  data: Nationality;
}

const editNationality = async (props: Props) => {
  // Check for authorized account
  const { isAuthorized, userId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { status: 401, success: false, data: null, error: 'Unauthorized' };
  }

  // Check for data existence
  const nationality = await finOne({
    id: props.id,
  });
  if (nationality.data === null)
    return {
      success: false,
      status: 404,
      data: null,
      error: 'Unable to find nationality to edit',
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

  // Begin nationality update
  const result = await updateOne(props.data);

  // Capture nationality modification to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'update',
      entity: 'nationality',
      userId,
      dataId: props.id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(nationality.data),
    });

  return { ...result, fields: [] };
};

export default editNationality;
