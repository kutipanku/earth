import { finOne } from '@backend/repository/database/author/read';
import type { Find } from '@backend/entity/author/type';

const getAuthorById = async (props: Find) => {
  // Begin author collection
  return finOne(props);
};

export default getAuthorById;
