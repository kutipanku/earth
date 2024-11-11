import { finOne } from '@/backend/repository/database/read/author';
import type { FindOneProps } from '@/backend/repository/database/read/author';

const getAuthorById = async (props: FindOneProps) => {
  const { id } = props;
  const result = await finOne({ id });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getAuthorById;
