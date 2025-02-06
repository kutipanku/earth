import { createOne } from '@backend/repository/database/quote/create';
import saveToLog from '../logger/save-to-log';
import getAuthStatus from '../auth/get-auth-status';

import type { Quote } from '@backend/entity/quote/type';

interface Props {
  data: Quote;
  sessionToken?: string;
}

const addNewQuote = async (props: Props) => {
  const { sessionToken, data } = props;

  // Check for authorization
  const { isAuthorized, userId } = await getAuthStatus({ sessionToken });
  if (!isAuthorized) {
    return { data: null, error: 'Unauthorized', status: 401 };
  }

  type BodyKey = keyof typeof data;
  const requiredFields: BodyKey[] = ['slug', 'content', 'description', 'url'];

  const errorFields = requiredFields.filter((key) => !data[key]);

  if (
    errorFields.length ||
    !data.slug ||
    !data.content ||
    !data.description ||
    !data.url
  ) {
    return {
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      fields: errorFields,
      status: 404,
    };
  }

  const result = await createOne({
    data: {
      slug: data.slug,
      content_en: data.content.eng,
      content_id: data.content.ind,
      description_en: data.description.eng,
      description_id: data.description.ind,
      image_en_url: data.url.eng,
      image_id_url: data.url.ind,
      ...(data.ids?.author_id && { author_id: data.ids.author_id }),
      ...(data.ids?.category_id && { category_id: data.ids.category_id }),
      ...(data.ids?.tags_id && {
        tags: {
          connect: data.ids.tags_id.map((tag_id) => ({ id: tag_id })),
        },
      }),
    },
  });

  if (result.status === 201)
    saveToLog({
      action: 'create',
      entity: 'quote',
      userId,
      dataId: result.data?.id || '',
      newData: JSON.stringify(result.data),
      oldData: JSON.stringify({}),
    });

  return {
    data: result.data,
    error: result.error,
    fields: result.errorFields,
    status: result.status,
  };
};

export default addNewQuote;
