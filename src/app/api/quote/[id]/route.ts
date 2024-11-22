import {
  retrieveQuoteById,
  changeQuoteDetail,
  removeQuote,
} from '@/backend/delivery/api/quote';

export const GET = retrieveQuoteById;
export const PUT = changeQuoteDetail;
export const DELETE = removeQuote;
