import { findMany } from '@backend/repository/database/author/read';
import type { Filter } from '@backend/entity/author/type';

const getAuthors = async (props: Filter) => {
  // Begin author collection
  return findMany(props);
};

export default getAuthors;
