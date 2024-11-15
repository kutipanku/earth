import { finOne } from '@/backend/repository/database/tag';
import type { FindOneProps } from '@/backend/repository/database/tag/types';

const getTagById = async (props: FindOneProps) => {
  const { id } = props;
  const result = await finOne({ id });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getTagById;
