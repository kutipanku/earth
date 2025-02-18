import { getLogById } from '@backend/usecase/logger';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type { GetLog } from './contract';

type RetrieveLogRequest = GetLog['request'];
type GetLogResponse = GetLog['response'];

export async function retrieveLogById(
  _: NextRequest,
  { params }: RetrieveLogRequest
) {
  const response = await getLogById(params);

  const processedResponse: GetLogResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
