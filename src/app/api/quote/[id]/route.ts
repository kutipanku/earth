import {
  retrieveQuoteById,
  changeQuoteDetail,
  removeQuote,
} from '@beckend/delivery/api/quote';

export const GET = retrieveQuoteById;
export const PUT = changeQuoteDetail;
export const DELETE = removeQuote;
