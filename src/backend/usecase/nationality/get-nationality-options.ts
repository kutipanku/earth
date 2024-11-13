import { findOptions } from '@/backend/repository/database/nationality';
import type { FindOptionsProps } from '@/backend/repository/database/nationality/types';

const getNationalityOptions = async (props: FindOptionsProps) => {
  const { name } = props;
  const result = await findOptions({ name });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getNationalityOptions;
