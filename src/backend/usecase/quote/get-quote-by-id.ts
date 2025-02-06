import { finOne } from '@backend/repository/database/quote';

interface Props {
  id: string;
}

const getQuoteById = async (props: Props) => {
  const { id } = props;
  const result = await finOne({
    where: {
      id,
    },
  });

  return { data: result.data, error: result.error, status: result.status };
};

export default getQuoteById;
