import { deleteAPI } from '../core';
import type { ReponseAPI } from '../core/types';
import { normalizeOutput } from './normalizer';
import type { NationalityResponseAPI } from './types';

type Reponse = ReponseAPI<NationalityResponseAPI>;
interface Props {
  id: string;
}

/**
 * Remove data to relative module's data source.
 */
const removeNationality = async ({ id }: Props) => {
  const response = await deleteAPI<string, Reponse>({
    identifier: 'nationality',
    id,
  });

  return {
    ...response,
    data: normalizeOutput(response.data),
  };
};

export default removeNationality;
