import { findOptions } from '@/backend/repository/database/profession';
import type { FindOptionsProps } from '@/backend/repository/database/profession/types';

const getProfessionOptions = async (props: FindOptionsProps) => {
  const { name } = props;
  const result = await findOptions({ name });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getProfessionOptions;
