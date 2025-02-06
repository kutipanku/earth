import { createOne } from '@backend/repository/database/log/create';

import type { CreateOneProps } from '@backend/repository/database/log/create';

const saveToLog = async (props: CreateOneProps) => {
  return createOne(props);
};

export default saveToLog;
