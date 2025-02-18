import { PAGE_TYPE } from '@frontend/entity/quote/constants';
import { deleteData } from '../shared/fetcher';
import { constructOwnSystemData } from './normalizer';

import type { RemoveQuote } from './types';

type RemoveQuoteResponse = RemoveQuote['response'];

/**
 * This function is responsible to make a network call to remove quote.
 */
const removeQuote = async (id: string) => {
  try {
    const response = await deleteData<RemoveQuoteResponse>({
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

export default removeQuote;
