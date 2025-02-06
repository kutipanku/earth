import { findMany } from '@backend/repository/database/quote/read';

interface Props {
  page: number;
  limit: number;
  filter_author: string | null;
  filter_content: string | null;
  filter_category: string | null;
  filter_tag: string | null;
}

const getQuotes = async (props: Props) => {
  const {
    page,
    limit,
    filter_author,
    filter_content,
    filter_category,
    filter_tag,
  } = props;
  const result = await findMany({
    skip: page * limit,
    take: limit,
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(filter_author && {
        author: {
          id: filter_author,
        },
      }),
      ...(filter_category && {
        category: {
          id: filter_category,
        },
      }),
      ...(filter_tag && {
        tags: {
          some: {
            id: {
              in: [filter_tag], // TODO: this should be array
            },
          },
        },
      }),
      ...(filter_content && {
        OR: [
          { content_en: { contains: filter_content, mode: 'insensitive' } },
          { content_id: { contains: filter_content, mode: 'insensitive' } },
        ],
      }),
    },
  });

  return { data: result.data, error: result.error, status: result.status };
};

export default getQuotes;
