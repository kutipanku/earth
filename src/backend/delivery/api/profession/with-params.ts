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

export async function retrieveProfessionById(
  _: NextRequest,
  { params: { id } }: RetrieveProfessionRequest
) {
  const response = await getProfessionById({
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

  if (response.error) {
    return NextResponse.json(
      {
        success: false,
        message: response.error,
        data: null,
      },
      { status: response.status }
    );
  }

  return NextResponse.json(
    { success: true, data: response.data },
    { status: 200 }
  );
}
