import { PAGE_TYPE } from '@frontend/entity/quote/constants';
import { updateData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Quote } from '@frontend/entity/quote/types';
import type { EditQuote } from './types';

type EditQuoteResponse = EditQuote['response'];
type EditQuoteRequestBody = EditQuote['request']['body'];

/**
 * This function is responsible to make a network call to edit quote.
 * Both the input and output data must be Quote type
 */
const editQuote = async (quote: Quote) => {
  try {
    const response = await updateData<EditQuoteRequestBody, EditQuoteResponse>({
      identifier: PAGE_TYPE,
      id: quote.id,
      body: constructExternalBodyPayload(quote),
    });

    return {
      success: response.success,
      message: response.message,
      fields: response.fields,
      data: constructOwnSystemData(response.data),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      fields: [],
      message: error,
    };
  }
};

export default editQuote;
