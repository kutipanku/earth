import { findMany } from '@backend/repository/database/quote/read';
import type { Filter } from '@backend/entity/quote/type';

const getQuotes = async (props: Filter) => {
  // Begin quote collection
  return findMany(props);
};

export default getQuotes;
