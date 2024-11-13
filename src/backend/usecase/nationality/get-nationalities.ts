import { findMany } from '@/backend/repository/database/nationality';
import type { FindManyProps } from '@/backend/repository/database/nationality/types';

const getNationalities = async (props: FindManyProps) => {
  const { page, limit, filterName, filterSlug } = props;
  const result = await findMany({ page, limit, filterName, filterSlug });

  return [
    { data: result.data, error: result.error },
    { status: result.status },
  ];
};

export default getNationalities;
