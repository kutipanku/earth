import { getLogs } from '@backend/usecase/logger';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeForList, normalizeOne } from './normalizer';

import type { GetLogs } from './contract';

type GetLogRequestSearchParams = GetLogs['request']['search_params'];
type GetLogsResponse = GetLogs['response'];

export async function retrieveLogs(req: NextRequest) {
  const searchParams: GetLogRequestSearchParams = {
    page: req.nextUrl.searchParams.get('page'),
    limit: req.nextUrl.searchParams.get('limit'),
    admin: req.nextUrl.searchParams.get('admin'),
    entity: req.nextUrl.searchParams.get('entity'),
    action: req.nextUrl.searchParams.get('action'),
  };

  const response = await getLogs({
    page: Number(searchParams.page),
    limit: Number(searchParams.limit),
    admin: searchParams.admin,
    entity: searchParams.entity,
    action: searchParams.action,
  });

  const processedResponse: GetLogsResponse = {
    success: response.success,
    message: response.error,
    data: {
      list: normalizeForList(response.data.list),
      total: response.data.total,
    },
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
