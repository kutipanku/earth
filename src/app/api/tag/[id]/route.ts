import {
  retrieveTagById,
  changeTagDetail,
  removeTag,
} from '@backend/delivery/api/tag';

export const GET = retrieveTagById;
export const PUT = changeTagDetail;
export const DELETE = removeTag;
