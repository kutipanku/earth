import { findOptions } from '@/backend/repository/database/tag';
import type { FindOptionsProps } from '@/backend/repository/database/tag/types';

const getTagOptions = async (props: FindOptionsProps) => {
  const { name } = props;
  const result = await findOptions({ name });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getTagOptions;
