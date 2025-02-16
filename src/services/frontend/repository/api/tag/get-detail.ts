import { PAGE_TYPE } from '@frontend/entity/tag/constants';
import { readDetailData } from '../shared/fetcher';
import { constructOwnSystemFieldData } from './normalizer';

import type { GetTag } from './types';

type GetTagResponse = GetTag['response'];

/**
 * Read detailed data to relative module's data source.
 */
const getTagDetail = async (id: string) => {
  try {
    const response = await readDetailData<GetTagResponse>({
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

export default getTagDetail;
