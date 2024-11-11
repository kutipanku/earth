import { createOne } from '@/backend/repository/database/create/log';
import type { CreateOneProps } from '@/backend/repository/database/create/log';

const saveToLog = async (props: CreateOneProps) => {
  return createOne(props);
};

export default saveToLog;
