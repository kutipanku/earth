import { findMany } from '@backend/repository/database/profession';
import type { Filter } from '@backend/entity/profession/type';

const getProfessions = async (props: Filter) => {
  // Begin profession collection
  return findMany(props);
};

export default getProfessions;
