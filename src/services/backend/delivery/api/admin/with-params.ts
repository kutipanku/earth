import { getAdminByEmail } from '@backend/usecase/admin';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type { GetAdmin } from './contract';

type RetrieveAdminRequest = GetAdmin['request'];
type GetAdminResponse = GetAdmin['response'];

export async function retrieveAdminByEmail(
  _: NextRequest,
  { params }: RetrieveAdminRequest
) {
  const response = await getAdminByEmail(params);

  const processedResponse: GetAdminResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
