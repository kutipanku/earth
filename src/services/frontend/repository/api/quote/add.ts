import { PAGE_TYPE } from '@frontend/entity/quote/constants';
import { createData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Quote } from '@frontend/entity/quote/types';
import type { AddQuote } from './types';

type AddQuoteResponse = AddQuote['response'];
type AddQuoteRequestBody = AddQuote['request']['body'];

/**
 * This function is responsible to make a network call to create new quote.
 * Both the input and output data must be Quote type
 */
const addQuote = async (quote: Quote) => {
  const response = await createData<AddQuoteRequestBody, AddQuoteResponse>({
    identifier: PAGE_TYPE,
    body: constructExternalBodyPayload(quote),
  });

  return {
    ...response,
    data: constructOwnSystemData(response.data),
  };
};

export default addQuote;
