import { PrismaClient } from '@prisma/client';
import cacheMiddleware from '../redis';

declare const globalThis: {
  prismaGlobal: DBClient['prisma'];
} & typeof global;

class DBClient {
  public prisma;
  private static instance: DBClient;
  private constructor() {
    const _prisma = new PrismaClient();
    const _prismaWithCache = _prisma
      .$extends(cacheMiddleware)
      .$extends({
        name: 'admin-action-tracker',
        model: {
          log: {
            /**
             * This function will capture the data exchange into DB
             */
            async capture({
              action,
              entity,
              adminId,
              data,
              dataId,
              dataOld,
            }: {
              action: string;
              entity: string;
              adminId: string;
              data: string;
              dataId: string;
              dataOld: string;
            }) {
              await _prisma.log.create({
                data: {
                  action,
                  entity,
                  admin_id: adminId,
                  data,
                  data_old: dataOld,
                  data_id: dataId,
                },
              });
            },
          },
        },
      })
      .$extends({
        name: 'time-logger',
        query: {
          async $allOperations({ model, args, operation, query }) {
            const before = Date.now();
            const result = await query(args);
            const after = Date.now();

            console.log(
              '\x1b[36m',
              `[time-logger] Query ${operation} of ${model} took -> ${after - before}ms`,
              '\x1b[0m'
            );
            return result;
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
