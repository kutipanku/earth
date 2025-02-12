import { PAGE_TYPE } from '@frontend/entity/profession/constants';
import { deleteData } from '../shared/fetcher';
import { constructOwnSystemData } from './normalizer';

import type { RemoveProfession } from './types';

type RemoveProfessionResponse = RemoveProfession['response'];

/**
 * This function is responsible to make a network call to remove profession.
 */
const removeProfession = async (id: string) => {
  try {
    const response = await deleteData<RemoveProfessionResponse>({
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

export default removeProfession;
