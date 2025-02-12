import { PAGE_TYPE } from '@frontend/entity/nationality/constants';
import { deleteData } from '../shared/fetcher';
import { constructOwnSystemData } from './normalizer';

import type { RemoveNationality } from './types';

type RemoveNationalityResponse = RemoveNationality['response'];

/**
 * This function is responsible to make a network call to remove nationality.
 */
const removeNationality = async (id: string) => {
  try {
    const response = await deleteData<RemoveNationalityResponse>({
      identifier: PAGE_TYPE,
      id,
    });

    return {
      success: response.success,
      message: response.message,
      data: constructOwnSystemData(response.data),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: error,
    };
  }
};

export default removeNationality;
