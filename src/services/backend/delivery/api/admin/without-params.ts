import { getAdmins } from '@backend/usecase/admin';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeForList } from './normalizer';

import type { GetAdmins } from './contract';

type GetAdminRequestSearchParams = GetAdmins['request']['search_params'];
type GetAdminsResponse = GetAdmins['response'];

export async function retrieveAdmins(req: NextRequest) {
  const searchParams: GetAdminRequestSearchParams = {
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    name: req.nextUrl.searchParams.get('name'),
  };

  const response = await getAdmins({
    page: Number(searchParams.page),
    limit: Number(searchParams.limit),
    name: searchParams.name,
  });

  const processedResponse: GetAdminsResponse = {
    success: response.success,
    message: response.error,
    data: {
      list: normalizeForList(response.data.list),
      total: response.data.total,
    },
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
