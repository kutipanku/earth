import {
  retrieveNationalityById,
  changeNationalityDetail,
  removeNationality,
} from '@backend/delivery/api/nationality';

export const GET = retrieveNationalityById;
export const PUT = changeNationalityDetail;
export const DELETE = removeNationality;
