import {
  retrieveTagById,
  changeTagDetail,
  removeTag,
} from '@beckend/delivery/api/tag';

export const GET = retrieveTagById;
export const PUT = changeTagDetail;
export const DELETE = removeTag;
