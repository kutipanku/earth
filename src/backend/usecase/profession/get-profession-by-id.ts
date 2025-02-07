import { finOne } from '@backend/repository/database/profession';
import type { Find } from '@backend/entity/profession/type';

const getProfessionById = async (props: Find) => {
  // Begin profession collection
  return finOne(props);
};

export default getProfessionById;
