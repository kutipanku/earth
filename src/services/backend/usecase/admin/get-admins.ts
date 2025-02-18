import { findMany } from '@backend/repository/database/admin/read';
import type { Filter } from '@backend/entity/admin/type';

const getAdmins = async (props: Filter) => {
  // Begin admin collection
  return findMany(props);
};

export default getAdmins;
