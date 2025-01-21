import { createAPI } from '../core';
import { normalizeInput, normalizeOutput } from './normalizer';
import type { ReponseAPI } from '../core/types';
import type {
  NationalityVariables,
  NationalityAddInputAPI,
  NationalityResponseAPI,
} from './types';

type Reponse = ReponseAPI<NationalityResponseAPI>;
interface Props {
  data: NationalityVariables;
}

/**
 * Add data to relative module's data source.
 */
const addNationality = async ({ data }: Props) => {
  const response = await createAPI<NationalityAddInputAPI, Reponse>({
    identifier: 'nationality',
    body: normalizeInput(data),
  });

  return {
    ...response,
    data: normalizeOutput(response.data),
  };
};

export default addNationality;
