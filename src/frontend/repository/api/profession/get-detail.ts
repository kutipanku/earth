import { readDetailAPI } from '../core';
import { normalizeOutputForField } from './normalizer';
import type { ReponseAPI } from '../core/types';
import type { ProfessionResponseAPI } from './types';

type Reponse = ReponseAPI<ProfessionResponseAPI>;
interface Props {
  id: string;
}

/**
 * Read detailed data to relative module's data source.
 */
const getProfessionDetail = async ({ id }: Props) => {
  const response = await readDetailAPI<string, Reponse>({
    identifier: 'profession',
    id,
  });

  return {
    ...response,
    data: normalizeOutputForField(response.data),
  };
};

export default getProfessionDetail;
