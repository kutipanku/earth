import { finOne } from '@backend/repository/database/profession';

interface Props {
  id: string;
}

const getProfessionById = async (props: Props) => {
  const { id } = props;
  const result = await finOne({
    where: {
      id,
    },
  });

  return { data: result.data, error: null, status: 200 };
};

export default getProfessionById;
