import { findOptions } from '@backend/repository/database/tag';
import type { Filter } from '@backend/entity/tag/type';

interface Props {
  name: string | null;
}

const getTagOptions = async (props: Filter) => {
  // Begin tag collection
  return findOptions(props);
};

export default getTagOptions;
