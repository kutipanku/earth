import { findOptions } from '@backend/repository/database/category';
import type { Filter } from '@backend/entity/category/type';

const getCategoryOptions = async (props: Filter) => {
  // Begin category collection
  return findOptions(props);
};

export default getCategoryOptions;
