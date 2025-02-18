import { PAGE_TYPE } from '@frontend/entity/log/constants';
import { readDetailData } from '../shared/fetcher';
import { constructOwnSystemFieldData } from './normalizer';

import type { GetLog } from './types';

type GetLogResponse = GetLog['response'];

/**
 * Read detailed data to relative module's data source.
 */
const getLogDetail = async (id: string) => {
  try {
    const response = await readDetailData<GetLogResponse>({
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

export default getLogDetail;
