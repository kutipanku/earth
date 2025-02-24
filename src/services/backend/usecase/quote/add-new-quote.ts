import { createOne } from '@backend/repository/database/quote/create';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Quote } from '@backend/entity/quote/type';

interface Props {
  data: Quote;
  sessionToken?: string;
}

const addNewQuote = async (props: Props) => {
  // Check for authorization
  const { isAuthorized, userId: adminId } = await getAuthStatus({
    sessionToken: props.sessionToken,
  });
  if (!isAuthorized) {
    return { success: false, status: 401, data: null, error: 'Unauthorized' };
  }

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
      fields: errorFields,
    };
  }

  // Begin quote creation
  const result = await createOne(props.data);

  // Capture quote creation to logger only if succeed
  if (result.success)
    saveToLog({
      action: 'create',
      entity: 'quote',
      adminId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return { ...result, fields: [] };
};

export default addNewQuote;
