import { finOne } from '@backend/repository/database/log/read';
import type { Find } from '@backend/entity/log/type';

const getLogById = async (props: Find) => {
  // Begin log collection
  return finOne(props);
};

export default getLogById;
