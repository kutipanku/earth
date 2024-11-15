import {
  retrieveCategories,
  addCategory,
} from '@/backend/delivery/api/category';

export const GET = retrieveCategories;
export const POST = addCategory;
