import { findOptions } from '@backend/repository/database/nationality';

interface Props {
  name: string | null;
}

const getNationalityOptions = async (props: Props) => {
  const { name } = props;
  const result = await findOptions({
    where: {
      ...(name && {
        OR: [
          { name_en: { contains: name, mode: 'insensitive' } },
          { name_id: { contains: name, mode: 'insensitive' } },
        ],
      }),
    },
  });

  return { data: result.data, error: null, status: 200 };
};

export default getNationalityOptions;
