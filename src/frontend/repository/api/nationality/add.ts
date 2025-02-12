import { PAGE_TYPE } from '@frontend/entity/nationality/constants';
import { createData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Nationality } from '@frontend/entity/nationality/types';
import type { AddNationality } from './types';

type AddNationalityResponse = AddNationality['response'];
type AddNationalityRequestBody = AddNationality['request']['body'];

/**
 * This function is responsible to make a network call to create new nationality.
 * Both the input and output data must be Nationality type
 */
const addNationality = async (nationality: Nationality) => {
  try {
    const response = await createData<
      AddNationalityRequestBody,
      AddNationalityResponse
    >({
      identifier: PAGE_TYPE,
      body: constructExternalBodyPayload(nationality),
    });

    return {
      success: response.success,
      message: response.message,
      fields: response.fields,
      data: constructOwnSystemData(response.data),
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      fields: [],
      message: error,
    };
  }
};

export default addNationality;
