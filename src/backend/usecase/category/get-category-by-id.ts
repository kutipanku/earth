import { finOne } from '@/backend/repository/database/category';
import type { FindOneProps } from '@/backend/repository/database/category/types';

const getCategoryById = async (props: FindOneProps) => {
  const { id } = props;
  const result = await finOne({ id });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getCategoryById;
