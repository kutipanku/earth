import { finOne } from '@backend/repository/database/quote';
import type { Find } from '@backend/entity/quote/type';

const getQuoteById = async (props: Find) => {
  // Begin quote collection
  return finOne(props);
};

export default getQuoteById;
