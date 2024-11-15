import { findOptions } from '@/backend/repository/database/category';
import type { FindOptionsProps } from '@/backend/repository/database/category/types';

const getCategoryOptions = async (props: FindOptionsProps) => {
  const { name } = props;
  const result = await findOptions({ name });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getCategoryOptions;
