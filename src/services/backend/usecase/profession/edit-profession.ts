import { finOne, updateOne } from '@backend/repository/database/profession';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Profession } from '@backend/entity/profession/type';

interface Props {
  id: string;
  sessionToken?: string;
  data: Profession;
}

const editProfession = async (props: Props) => {
  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { success: false, status: 401, data: null, error: 'Unauthorized' };
  }

  // Check for data existence
  const profession = await finOne({
    id: props.id,
  });
  if (!profession || profession === null)
    return {
      success: false,
      status: 404,
      data: null,
      error: 'Unable to find profession to edit',
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

  // Begin profession update
  const result = await updateOne(props.data);

  // Capture profession modification to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'update',
      entity: 'profession',
      userId,
      dataId: props.id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(profession.data),
    });

  return { ...result, fields: [] };
};

export default editProfession;
