import { PAGE_TYPE } from '@frontend/entity/tag/constants';
import { readRowsData } from '../shared/fetcher';
import { constructOwnSystemRowData } from './normalizer';

import type { Tag, TagFilter } from '@frontend/entity/tag/types';
import type { GetTags } from './types';

type GetTagsResponse = GetTags['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: TagFilter;
}

/**
 * This function is responsible to make a network call to get tag as rows.
 */
const getTagRows = async ({ page = 0, rowPerPage = 100, filter }: Props) => {
  const processedFilter = Object.fromEntries(
    Object.entries(filter).filter(
      ([_, value]) => value !== null && value !== undefined
    )
  );

  try {
    const response: GetTagsResponse = await readRowsData({
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
        list: [] as Tag[],
        total: 0,
      },
    };
  }
};

export default getTagRows;
