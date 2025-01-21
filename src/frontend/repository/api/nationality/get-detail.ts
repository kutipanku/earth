import { readDetailAPI } from '../core';
import { normalizeOutputForField } from './normalizer';
import type { ReponseAPI } from '../core/types';
import type { NationalityResponseAPI } from './types';

type Reponse = ReponseAPI<NationalityResponseAPI>;
interface Props {
  id: string;
}

/**
 * Read detailed data to relative module's data source.
 */
const getNationalityDetail = async ({ id }: Props) => {
  const response = await readDetailAPI<string, Reponse>({
    identifier: 'nationality',
    id,
  });

  return {
    ...response,
    data: normalizeOutputForField(response.data),
  };
};

export default getNationalityDetail;
