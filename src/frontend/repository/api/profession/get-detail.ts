import { PAGE_TYPE } from '@frontend/entity/profession/constants';
import { readDetailData } from '../shared/fetcher';
import { constructOwnSystemFieldData } from './normalizer';

import type { GetProfession } from './types';

type GetProfessionResponse = GetProfession['response'];

/**
 * Read detailed data to relative module's data source.
 */
const getProfessionDetail = async (id: string) => {
  try {
    const response = await readDetailData<GetProfessionResponse>({
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

export default getProfessionDetail;
