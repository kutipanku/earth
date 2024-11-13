import { finOne } from '@/backend/repository/database/nationality';
import type { FindOneProps } from '@/backend/repository/database/nationality/types';

const getNationalityById = async (props: FindOneProps) => {
  const { id } = props;
  const result = await finOne({ id });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getNationalityById;
