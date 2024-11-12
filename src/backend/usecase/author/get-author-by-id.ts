import { finOne } from '@/backend/repository/database/author/read';
import type { FindOneProps } from '@/backend/repository/database/author/read';

const getAuthorById = async (props: FindOneProps) => {
  const { id } = props;
  const result = await finOne({ id });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getAuthorById;
