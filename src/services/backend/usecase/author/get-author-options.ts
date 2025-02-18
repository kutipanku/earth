import { findOptions } from '@backend/repository/database/author';
import type { Filter } from '@backend/entity/author/type';

const getAuthorOptions = async (props: Filter) => {
  // Begin author collection
  return findOptions(props);
};

export default getAuthorOptions;
