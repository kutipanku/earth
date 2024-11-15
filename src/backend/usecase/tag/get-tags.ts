import { findMany } from '@/backend/repository/database/category';
import type { FindManyProps } from '@/backend/repository/database/category/types';

const getTags = async (props: FindManyProps) => {
  const { page, limit, filterName, filterSlug } = props;
  const result = await findMany({ page, limit, filterName, filterSlug });

  return [
    { data: result.data, error: result.error },
    { status: result.status },
  ];
};

export default getTags;
