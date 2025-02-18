import { PAGE_TYPE } from '@frontend/entity/author/constants';
import { readOptionsData } from '../shared/fetcher';
import { constructOwnSystemOptionData } from './normalizer';

import type { AuthorFilter } from '@frontend/entity/author/types';
import type { GetAuthorOptions } from './types';

type GetAuthorOptionsResponse = GetAuthorOptions['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: AuthorFilter;
}

/**
 * This function is responsible to make a network call to get author as options.
 */
const getAuthorOptions = async ({
  page = 0,
  rowPerPage = 100,
  filter,
}: Props) => {
  const processedFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  );

  try {
    const response = await readOptionsData<GetAuthorOptionsResponse>({
      identifier: 'author',
      page,
      rowPerPage,
      filterString: new URLSearchParams(processedFilter).toString(),
    });
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

export default getAuthorOptions;
