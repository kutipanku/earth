import {
  retrieveAuthorById,
  changeAuthorDetail,
  removeAuthor,
} from '@beckend/delivery/api/author';

export const GET = retrieveAuthorById;
export const PUT = changeAuthorDetail;
export const DELETE = removeAuthor;
