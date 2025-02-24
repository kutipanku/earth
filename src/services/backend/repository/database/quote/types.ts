import type { Prisma } from '../../lib/prisma/types';

//////////////////////////////////////////////////////////
// Request
//////////////////////////////////////////////////////////
export type InputQuoteCreate = Prisma.QuoteCreateArgs;
export type InputQuoteUpdate = Prisma.QuoteUpdateArgs;
export type InputQuoteDelete = Prisma.QuoteDeleteArgs;
export type InputQuoteGetMany = Prisma.QuoteFindManyArgs;
export type InputQuoteGetOne = Prisma.QuoteFindFirstArgs;

//////////////////////////////////////////////////////////
// Response
//////////////////////////////////////////////////////////
export type ResponseQuote = Prisma.QuoteGetPayload<{
  include: {
    author: {
      include: {
        nationality: true;
        profession: true;
      };
    };
    category: true;
    tags: true;
  };
}>;

export type ResponseQuoteSimplified = Prisma.QuoteGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
      };
    };
    category: {
      select: {
        id: true;
        name_eng: true;
      };
    };
    tags: {
      select: {
        id: true;
        name_eng: true;
      };
    };
  };
}>;
