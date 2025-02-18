import { PAGE_TYPE } from '@frontend/entity/author/constants';
import { readDetailData } from '../shared/fetcher';
import { constructOwnSystemFieldData } from './normalizer';

import type { GetAuthor } from './types';

type GetAuthorResponse = GetAuthor['response'];

/**
 * Read detailed data to relative module's data source.
 */
const getAuthorDetail = async (id: string) => {
  try {
    const response = await readDetailData<GetAuthorResponse>({
      identifier: PAGE_TYPE,
      id,
    });

    return {
      success: response.success,
      data: constructOwnSystemFieldData(response.data),
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error,
    };
  }
};

export default getAuthorDetail;
