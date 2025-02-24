import { finOne, updateOne } from '@backend/repository/database/quote';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Quote } from '@backend/entity/quote/type';

interface Props {
  id: string;
  sessionToken?: string;
  data: Quote;
}

const editQuote = async (props: Props) => {
  // Check for authorization
  const { isAuthorized, userId: adminId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { success: false, status: 401, data: null, error: 'Unauthorized' };
  }

  // Check for data existence
  const quote = await finOne({
    id: props.id,
  });
  if (!quote || quote === null)
    return {
      success: false,
      status: 404,
      data: null,
      error: 'Unable to find quote to edit',
      fields: [],
    };

  // Check for required fields
  type BodyKey = keyof typeof props.data;
  const requiredFields: BodyKey[] = ['slug', 'content', 'description', 'url'];
  const errorFields = requiredFields.filter((key) => !props.data[key]);
  if (
    errorFields.length ||
    !props.data.slug ||
    !props.data.content ||
    !props.data.description ||
    !props.data.url
  ) {
    return {
      success: false,
      status: 404,
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      fields: errorFields as string[],
    };
  }

  // Begin quote update
  const result = await updateOne(props.data);

  // Capture author modification to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'update',
      entity: 'quote',
      adminId,
      dataId: props.id,
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify(quote.data),
    });

  return { ...result, fields: [] };
};

export default editQuote;
