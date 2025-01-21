import { updateAPI } from '../core';
import { normalizeInput, normalizeOutput } from './normalizer';
import type { ReponseAPI } from '../core/types';
import type {
  NationalityVariables,
  NationalityAddInputAPI,
  NationalityResponseAPI,
} from './types';

interface EditResponse {
  old: NationalityResponseAPI;
  new: NationalityResponseAPI;
}

type Reponse = ReponseAPI<EditResponse>;
interface Props {
  id: string;
  data: NationalityVariables;
}

/**
 * Edit data to relative module's data source.
 */
const editNationality = async ({ id, data }: Props) => {
  const response = await updateAPI<NationalityAddInputAPI, Reponse>({
    identifier: 'nationality',
    body: normalizeInput(data),
    id,
  });

  return {
    ...response,
    data: {
      old: normalizeOutput(response.data.old),
      new: normalizeOutput(response.data.new),
    },
  };
};

export default editNationality;
