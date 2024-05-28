import { PrismaClient } from '@prisma/client';
import cacheMiddleware from '@/lib/redis';

declare const globalThis: {
  prismaGlobal: DBClient['prisma'];
} & typeof global;

class DBClient {
  public prisma;
  private static instance: DBClient;
  private constructor() {
    const _prisma = new PrismaClient();
    const _prismaWithCache = _prisma.$extends(cacheMiddleware).$extends({
      name: 'admin-action-tracker',
      model: {
        log: {
          /**
           * This function will capture the data exchange into DB
           */
          async capture({
            action,
            entity,
            userId,
            data,
            dataId,
            dataOld,
          }: {
            action: string;
            entity: string;
            userId: string;
            data: string;
            dataId: string;
            dataOld: string;
          }) {
            await _prisma.log.create({
              data: {
                action,
                entity,
                user_id: userId,
                data,
                data_old: dataOld,
                data_id: dataId
              }
            })
          },
        },
      },
    });

    this.prisma = _prismaWithCache;
  }

  public static getInstance = () => {
    if (!DBClient.instance) {
      DBClient.instance = new DBClient();
    }
    return DBClient.instance;
  };
}

const main = () => {
  const prisma = globalThis.prismaGlobal ?? DBClient.getInstance().prisma;
  return prisma;
};

export default main();

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = main();
