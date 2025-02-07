import { findOptions } from '@/backend/repository/database/profession';
import type { Filter } from '@backend/entity/profession/type';

const getProfessionOptions = async (props: Filter) => {
  // Begin profession collection
  return findOptions(props);
};

export default getProfessionOptions;
