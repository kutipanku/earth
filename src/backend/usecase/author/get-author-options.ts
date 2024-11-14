import { findOptions } from '@/backend/repository/database/author';
import type { FindOptionsProps } from '@/backend/repository/database/author/types';

const getAuthorOptions = async (props: FindOptionsProps) => {
  const { name } = props;
  const result = await findOptions({ name });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getAuthorOptions;
