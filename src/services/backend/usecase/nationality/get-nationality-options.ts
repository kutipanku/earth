import { findOptions } from '@backend/repository/database/nationality';
import type { Filter } from '@backend/entity/nationality/type';

const getNationalityOptions = async (props: Filter) => {
  // Begin nationality collection
  return findOptions(props);
};

export default getNationalityOptions;
