import {
  editNationality,
  getNationalityById,
  removeNationalityById,
} from '@backend/usecase/nationality';
import { NextRequest, NextResponse } from '../../lib/next';
import { normalizeOne } from './normalizer';

import type {
  EditNationality,
  GetNationality,
  RemoveNationality,
} from './contract';

type RetrieveNationalityRequest = GetNationality['request'];
type RemoveNationalityRequest = RemoveNationality['request'];
type ChangeNationalityRequest = EditNationality['request'];
type ChangeNationalityRequestBody = EditNationality['request']['body'];

type GetNationalityResponse = GetNationality['response'];
type EditNationalityResponse = EditNationality['response'];
type RemoveNationalityResponse = RemoveNationality['response'];

export async function retrieveNationalityById(
  _: NextRequest,
  { params }: RetrieveNationalityRequest
) {
  const response = await getNationalityById(params);

  const processedResponse: GetNationalityResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function changeNationalityDetail(
  req: NextRequest,
  { params: { id } }: ChangeNationalityRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const body: ChangeNationalityRequestBody = await req.json();

  const response = await editNationality({
    sessionToken: sessionToken?.value,
    id,
    data: {
      id,
      name: {
        eng: body.name?.eng || '',
        ind: body.name?.ind || '',
      },
      slug: body.slug || '',
      flag: body.flag || null,
      metadata: null,
    },
  });

  const processedResponse: EditNationalityResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
    fields: response.fields,
  };

  return NextResponse.json(processedResponse, { status: response.status });
}

export async function removeNationality(
  req: NextRequest,
  { params: { id } }: RemoveNationalityRequest
) {
  const sessionToken = req.cookies.get(
    process.env.NEXTAUTH_SESSION_TOKEN_NAME || ''
  );

  const response = await removeNationalityById({
    id,
    sessionToken: sessionToken?.value,
  });

  const processedResponse: RemoveNationalityResponse = {
    success: response.success,
    message: response.error,
    data: normalizeOne(response.data),
  };

  return NextResponse.json(processedResponse, { status: response.status });
}
