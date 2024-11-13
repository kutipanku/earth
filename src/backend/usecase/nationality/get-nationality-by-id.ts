import { finOne } from '@/backend/repository/database/nationality/read';
import type { FindOneProps } from '@/backend/repository/database/nationality/read';

const getNationalityById = async (props: FindOneProps) => {
  const { id } = props;
  const result = await finOne({ id });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getNationalityById;
