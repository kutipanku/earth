import {
  retrieveProfessionById,
  changeProfessionDetail,
  removeProfession,
} from '@backend/delivery/api/profession';

export const GET = retrieveProfessionById;
export const PUT = changeProfessionDetail;
export const DELETE = removeProfession;
