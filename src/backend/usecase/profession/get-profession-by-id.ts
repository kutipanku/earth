import { finOne } from '@/backend/repository/database/profession';
import type { FindOneProps } from '@/backend/repository/database/profession/types';

const getProfessionById = async (props: FindOneProps) => {
  const { id } = props;
  const result = await finOne({ id });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getProfessionById;
