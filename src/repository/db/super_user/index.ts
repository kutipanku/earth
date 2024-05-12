import prisma from '@/lib/prisma';

export const setDefaultSuperUser = () => {
  return prisma.superUser.create({
    data: {
      name: 'Maestro Trastanechora',
      email: 'trastanechora@gmail.com',
    },
  });
};

export const getSuperUserByEmail = (email: string) => {
  return prisma.superUser.findUnique({
    where: {
      email: email,
    },
  });
};
