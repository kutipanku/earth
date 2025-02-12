import { updateAPI } from '../shared/fetcher';
import { normalizeInput, normalizeOutput } from './normalizer';
import type { ReponseAPI } from '../shared/types';
import type {
  ProfessionVariables,
  ProfessionAddInputAPI,
  ProfessionResponseAPI,
} from './types';

interface EditResponse {
  old: ProfessionResponseAPI;
  new: ProfessionResponseAPI;
}

type Reponse = ReponseAPI<EditResponse>;
interface Props {
  id: string;
  data: ProfessionVariables;
}

/**
 * Edit data to relative module's data source.
 */
const editProfession = async ({ id, data }: Props) => {
  const response = await updateAPI<ProfessionAddInputAPI, Reponse>({
    identifier: 'profession',
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

export default editProfession;
