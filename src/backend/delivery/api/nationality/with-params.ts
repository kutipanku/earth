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

export async function retrieveNationalityById(
  _: NextRequest,
  { params: { id } }: RetrieveNationalityRequest
) {
  const response = await getNationalityById({
    id,
  });

  if (response.error) {
    return NextResponse.json(
      { success: false, message: response.error },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: normalizeOne(response.data) },
    { status: 200 }
  );
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
        eng: body.name?.eng || null,
        ind: body.name?.ind || null,
      },
      slug: body.slug || '',
      flag: body.flag || null,
      metadata: null,
    },
  });

  if (response.error) {
    return NextResponse.json(
      {
        success: false,
        message: response.error,
        data: { fields: response.fields },
      },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
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

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
}
