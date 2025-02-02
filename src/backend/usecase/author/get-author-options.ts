import { findOptions } from '@/backend/repository/database/author';

interface Props {
  name: string | null;
}

const getAuthorOptions = async (props: Props) => {
  const { name } = props;
  const result = await findOptions({
    where: {
      ...(name && {
        OR: [{ name: { contains: name, mode: 'insensitive' } }],
      }),
    },
  });

  return { data: result.data, error: result.error, status: result.status };
};

export default getAuthorOptions;
