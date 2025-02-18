import {
  retrieveAuthorById,
  changeAuthorDetail,
  removeAuthor,
} from '@backend/delivery/api/author';

export const GET = retrieveAuthorById;
export const PUT = changeAuthorDetail;
export const DELETE = removeAuthor;
