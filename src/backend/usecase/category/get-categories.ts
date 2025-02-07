import { findMany } from '@backend/repository/database/category';
import type { Filter } from '@backend/entity/category/type';

const getCategories = async (props: Filter) => {
  // Begin category collection
  return findMany(props);
};

export default getCategories;
