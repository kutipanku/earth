import { finOne } from '@backend/repository/database/nationality';

interface Props {
  id: string;
}

const getNationalityById = async (props: Props) => {
  const { id } = props;
  const result = await finOne({
    where: {
      id,
    },
  });

  return { data: result.data, error: null, status: 200 };
};

export default getNationalityById;
