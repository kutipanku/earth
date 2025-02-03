import { findMany } from '@backend/repository/database/author/read';

interface Props {
  page: number;
  limit: number;
  filter_name: string | null;
  filter_slug: string | null;
}

const getAuthors = async (props: Props) => {
  const { page, limit, filter_name, filter_slug } = props;
  const result = await findMany({
    skip: page * limit,
    take: limit,
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(filter_name && {
        name: { contains: filter_name, mode: 'insensitive' },
      }),
      ...(filter_slug && {
        slug: { contains: filter_slug, mode: 'insensitive' },
      }),
    },
  });

  return { data: result.data, error: result.error, status: result.status };
};

export default getAuthors;
