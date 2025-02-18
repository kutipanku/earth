import { PAGE_TYPE } from '@frontend/entity/author/constants';
import { readDetailData } from '../shared/fetcher';
import { constructOwnSystemFieldData } from './normalizer';

import type { GetAdmin } from './types';

type GetAdminResponse = GetAdmin['response'];

/**
 * Read detailed data to relative module's data source.
 */
const getAdminDetail = async (email: string) => {
  try {
    const response = await readDetailData<GetAdminResponse>({
      identifier: PAGE_TYPE,
      id: email,
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

export default getAdminDetail;
