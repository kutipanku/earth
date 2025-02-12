import { PAGE_TYPE } from '@frontend/entity/profession/constants';
import { updateData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Profession } from '@frontend/entity/profession/types';
import type { EditProfession } from './types';

type EditProfessionResponse = EditProfession['response'];
type EditProfessionRequestBody = EditProfession['request']['body'];

/**
 * This function is responsible to make a network call to edit profession.
 * Both the input and output data must be Profession type
 */
const editProfession = async (profession: Profession) => {
  try {
    const response = await updateData<
      EditProfessionRequestBody,
      EditProfessionResponse
    >({
      identifier: PAGE_TYPE,
      id: profession.id,
      body: constructExternalBodyPayload(profession),
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

export default editProfession;
