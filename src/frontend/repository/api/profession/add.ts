import { createAPI } from '../core';
import { normalizeInput, normalizeOutput } from './normalizer';
import type { ReponseAPI } from '../core/types';
import type {
  ProfessionVariables,
  ProfessionAddInputAPI,
  ProfessionResponseAPI,
} from './types';

type Reponse = ReponseAPI<ProfessionResponseAPI>;
interface Props {
  data: ProfessionVariables;
}

/**
 * Add data to relative module's data source.
 */
const addProfession = async ({ data }: Props) => {
  const response = await createAPI<ProfessionAddInputAPI, Reponse>({
    identifier: 'profession',
    body: normalizeInput(data),
  });

  return {
    ...response,
    data: normalizeOutput(response.data),
  };
};

export default addProfession;
