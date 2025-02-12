import { findMany } from '@backend/repository/database/nationality';
import type { Filter } from '@backend/entity/nationality/type';

const getNationalities = async (props: Filter) => {
  // Begin nationality collection
  return findMany(props);
};

export default getNationalities;
