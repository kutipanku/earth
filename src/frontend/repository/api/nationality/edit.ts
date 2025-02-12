import { PAGE_TYPE } from '@frontend/entity/nationality/constants';
import { updateData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Nationality } from '@frontend/entity/nationality/types';
import type { EditNationality } from './types';

type EditNationalityResponse = EditNationality['response'];
type EditNationalityRequestBody = EditNationality['request']['body'];

/**
 * This function is responsible to make a network call to edit nationality.
 * Both the input and output data must be Nationality type
 */
const editNationality = async (props: Nationality) => {
  try {
    const response = await updateData<
      EditNationalityRequestBody,
      EditNationalityResponse
    >({
      identifier: PAGE_TYPE,
      id: props.id,
      body: constructExternalBodyPayload(props),
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

export default editNationality;
