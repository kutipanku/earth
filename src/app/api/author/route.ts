import { retrieveAuthors, addAuthor } from '@backend/delivery/api/author';

export const GET = retrieveAuthors;
export const POST = addAuthor;
