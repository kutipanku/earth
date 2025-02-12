import {
  retrieveCategoryById,
  changeCategoryDetail,
  removeCategory,
} from '@beckend/delivery/api/category';

export const GET = retrieveCategoryById;
export const PUT = changeCategoryDetail;
export const DELETE = removeCategory;
