import { findMany } from '@backend/repository/database/log/read';
import type { Filter } from '@backend/entity/log/type';

const getLogs = async (props: Filter) => {
  // Begin log collection
  return findMany(props);
};

export default getLogs;
