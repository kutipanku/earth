import { NextResponse } from 'next/server';
import {
  getSuperUserByEmail,
  setDefaultSuperUser,
} from '@/repository/db/super_user';

export async function POST() {
  const exists = await getSuperUserByEmail('trastanechora@gmail.com');

  if (exists) {
    return NextResponse.json(
      { error: 'Super user already exist' },
      { status: 400 }
    );
  } else {
    const superUser = await setDefaultSuperUser();
    return NextResponse.json({ status: 200, data: superUser });
  }
}
