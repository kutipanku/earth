import { finOne } from '@/backend/repository/database/author/read';

interface Props {
  id: string;
}

const getAuthorById = async (props: Props) => {
  const { id } = props;
  const result = await finOne({
    where: {
      id,
    },
  });

  return { data: result.data, error: result.error, status: result.status };
};

export default getAuthorById;
