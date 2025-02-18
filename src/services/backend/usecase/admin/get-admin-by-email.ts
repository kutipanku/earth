import { finOne } from '@backend/repository/database/admin/read';
import type { Find } from '@backend/entity/admin/type';

const getAdminById = async (props: Find) => {
  // Begin admin collection
  return finOne(props);
};

export default getAdminById;
