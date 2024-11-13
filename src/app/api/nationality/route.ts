import {
  retrieveNationalities,
  addNationality,
} from '@/backend/delivery/api/nationality';

export const GET = retrieveNationalities;
export const POST = addNationality;
