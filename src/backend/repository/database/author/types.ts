import type { Prisma } from '@/backend/repository/lib/prisma-types';

export type AuthorForMany = Prisma.AuthorGetPayload<{
  include: {
    nationality: {
      select: {
        name_en: true;
      };
    };
    profession: {
      select: {
        name_en: true;
      };
    };
  };
}>;

export type AuthorForOne = Prisma.AuthorGetPayload<{
  include: {
    nationality: true;
    profession: true;
  };
}>;
