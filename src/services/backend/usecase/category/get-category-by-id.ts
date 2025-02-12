import { finOne } from '@backend/repository/database/category';
import type { Find } from '@backend/entity/category/type';

const getCategoryById = async (props: Find) => {
  // Begin category collection
  return finOne(props);
};

export default getCategoryById;
