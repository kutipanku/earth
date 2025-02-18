import { finOne } from '@backend/repository/database/nationality';
import type { Find } from '@backend/entity/nationality/type';

const getNationalityById = async (props: Find) => {
  // Begin nationality collection
  return finOne(props);
};

export default getNationalityById;
