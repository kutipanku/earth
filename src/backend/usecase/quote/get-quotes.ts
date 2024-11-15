import { findMany } from '@/backend/repository/database/quote/read';
import type { FindManyProps } from '@/backend/repository/database/quote/types';

const getQuotes = async (props: FindManyProps) => {
  const {
    page,
    limit,
    filter_content_id,
    filter_content_en,
    filter_category_id,
    filter_category_en,
    filter_tag_id,
    filter_tag_en,
    filter_author,
  } = props;
  const result = await findMany({
    page,
    limit,
    filter_content_id,
    filter_content_en,
    filter_category_id,
    filter_category_en,
    filter_tag_id,
    filter_tag_en,
    filter_author,
  });

  return [
    { data: result.data, error: result.error },
    { status: result.status },
  ];
};

export default getQuotes;
