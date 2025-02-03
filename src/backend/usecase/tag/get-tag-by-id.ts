import { finOne } from '@backend/repository/database/tag';

interface Props {
  id: string;
}

const getTagById = async (props: Props) => {
  const { id } = props;
  const result = await finOne({
    where: {
      id,
    },
  });

  return { data: result.data, error: null, status: 200 };
};

export default getTagById;
