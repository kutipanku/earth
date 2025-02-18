import { PAGE_TYPE } from '@frontend/entity/quote/constants';
import { readDetailData } from '../shared/fetcher';
import { constructOwnSystemFieldData } from './normalizer';

import type { GetQuote } from './types';

type GetQuoteResponse = GetQuote['response'];

/**
 * Read detailed data to relative module's data source.
 */
const getQuoteDetail = async (id: string, type: 'detail' | 'edit') => {
  try {
    const response = await readDetailData<GetQuoteResponse>({
      identifier: PAGE_TYPE,
      id,
    });

    return {
      success: response.success,
      data: constructOwnSystemFieldData(response.data, type),
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

export default getQuoteDetail;
