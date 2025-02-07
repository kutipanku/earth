import { finOne } from '@backend/repository/database/tag';
import type { Find } from '@backend/entity/tag/type';

const getTagById = async (props: Find) => {
  // Begin tag collection
  return finOne(props);
};

export default getTagById;
