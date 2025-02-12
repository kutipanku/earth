import { findMany } from '@beckend/repository/database/category';
import type { Filter } from '@backend/entity/tag/type';

const getTags = async (props: Filter) => {
  // Begin tag collection
  return findMany(props);
};

export default getTags;
