import { PAGE_TYPE } from '@frontend/entity/nationality/constants';
import { readOptionsData } from '../shared/fetcher';
import { constructOwnSystemOptionData } from './normalizer';

import type { NationalityFilter } from '@frontend/entity/nationality/types';
import type { GetNationalityOptions } from './types';

type GetNationalityOptionsResponse = GetNationalityOptions['response'];

interface Props {
  page?: number;
  rowPerPage?: number;
  filter: NationalityFilter;
}

/**
 * This function is responsible to make a network call to get nationality as options.
 */
const getNationalityOptions = async ({
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
    const response = await readOptionsData<GetNationalityOptionsResponse>({
      identifier: PAGE_TYPE,
      page,
      rowPerPage,
      filterString: new URLSearchParams(processedFilter).toString(),
    });

    return {
      success: response.success,
      data: constructOwnSystemOptionData(response.data),
      message: response.message,
    };
  } catch (error) {
    return {
      success: false,
      data: [],
      message: error,
    };
  }
};

export default getNationalityOptions;
