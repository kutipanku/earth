import {
  retrieveNationalityById,
  changeNationalityDetail,
  removeNationality,
} from '@beckend/delivery/api/nationality';

export const GET = retrieveNationalityById;
export const PUT = changeNationalityDetail;
export const DELETE = removeNationality;
