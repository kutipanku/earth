import { deleteAPI } from '../core';
import type { ReponseAPI } from '../core/types';
import { normalizeOutput } from './normalizer';
import type { ProfessionResponseAPI } from './types';

type Reponse = ReponseAPI<ProfessionResponseAPI>;
interface Props {
  id: string;
}

/**
 * Remove data to relative module's data source.
 */
const removeProfession = async ({ id }: Props) => {
  const response = await deleteAPI<string, Reponse>({
    identifier: 'profession',
    id,
  });

  return {
    ...response,
    data: normalizeOutput(response.data),
  };
};

export default removeProfession;
