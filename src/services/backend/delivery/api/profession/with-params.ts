import {
  getProfessionById,
  editProfession,
  removeProfessionById,
} from '@backend/usecase/profession';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type {
  EditProfession,
  GetProfession,
  RemoveProfession,
} from './contract';

type RetrieveProfessionRequest = GetProfession['request'];
type RemoveProfessionRequest = RemoveProfession['request'];
type ChangeProfessionRequest = EditProfession['request'];
type ChangeProfessionRequestBody = EditProfession['request']['body'];

type GetProfessionResponse = GetProfession['response'];
type EditProfessionResponse = EditProfession['response'];
type RemoveProfessionResponse = RemoveProfession['response'];

export async function retrieveProfessionById(
  _: NextRequest,
  { params }: RetrieveProfessionRequest
) {
  const response = await getProfessionById(params);

  const processedResponse: GetProfessionResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function changeProfessionDetail(
  req: NextRequest,
  { params: { id } }: ChangeProfessionRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: ChangeProfessionRequestBody = await req.json();

  const response = await editProfession({
    sessionToken: sessionToken?.value,
    id,
    data: {
      id,
      name: {
        eng: body.name?.eng || null,
        ind: body.name?.ind || null,
      },
      slug: body.slug || '',
      icon: body.icon || null,
      metadata: null,
    },
  });

  const processedResponse: EditProfessionResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function removeProfession(
  req: NextRequest,
  { params: { id } }: RemoveProfessionRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeProfessionById({
    id,
    sessionToken: sessionToken?.value,
  });

  const processedResponse: RemoveProfessionResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
