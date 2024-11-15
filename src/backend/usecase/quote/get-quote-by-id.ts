import { finOne } from '@/backend/repository/database/quote/read';
import type { FindOneProps } from '@/backend/repository/database/quote/types';

const getQuoteById = async (props: FindOneProps) => {
  const { id } = props;
  const result = await finOne({ id });

  return [{ data: result.data, error: null }, { status: 200 }];
};

export default getQuoteById;
