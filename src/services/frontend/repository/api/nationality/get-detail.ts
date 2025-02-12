import { PAGE_TYPE } from '@frontend/entity/nationality/constants';
import { readDetailData } from '../shared/fetcher';
import { constructOwnSystemFieldData } from './normalizer';

import type { GetNationality } from './types';

type GetNationalityResponse = GetNationality['response'];

/**
 * Read detailed data to relative module's data source.
 */
const getNationalityDetail = async (id: string) => {
  try {
    const response = await readDetailData<GetNationalityResponse>({
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

export default getNationalityDetail;
