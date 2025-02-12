import { PAGE_TYPE } from '@frontend/entity/profession/constants';
import { createData } from '../shared/fetcher';
import {
  constructExternalBodyPayload,
  constructOwnSystemData,
} from './normalizer';

import type { Profession } from '@frontend/entity/profession/types';
import type { AddProfession } from './types';

type AddProfessionResponse = AddProfession['response'];
type AddProfessionRequestBody = AddProfession['request']['body'];

/**
 * This function is responsible to make a network call to create new profession.
 * Both the input and output data must be Profession type
 */
const addProfession = async (profession: Profession) => {
  const response = await createData<
    AddProfessionRequestBody,
    AddProfessionResponse
  >({
    identifier: 'profession',
    body: constructExternalBodyPayload(profession),
  });

  return {
    ...response,
    data: constructOwnSystemData(response.data),
  };
};

export default addProfession;
