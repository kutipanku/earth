import { PAGE_TYPE } from '@frontend/entity/author/constants';
import { readRowsData } from '../shared/fetcher';
import { constructOwnSystemRowData } from './normalizer';

import type { Author, AuthorFilter } from '@frontend/entity/author/types';
import type { GetAuthors } from './types';

type GetAuthorsResponse = GetAuthors['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: AuthorFilter;
}

/**
 * Read rows data to relative module's data source.
 */
const getAuthorRows = async ({ page = 0, rowPerPage = 100, filter }: Props) => {
  const processedFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  );

  try {
    const response = await readRowsData<GetAuthorsResponse>({
      identifier: PAGE_TYPE,
      page,
      rowPerPage,
      filterString: new URLSearchParams(processedFilter).toString(),
    });

    return {
      succsess: response.success,
      message: null,
      data: {
        list: constructOwnSystemRowData(response.data.list),
        total: response.data.total,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: error,
      data: {
        list: [] as Author[],
        total: 0,
      },
    };
  }
};

export default getAuthorRows;
