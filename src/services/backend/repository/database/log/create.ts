import prisma from '../../lib/prisma/prisma';

export interface CreateOneProps {
  action: 'create' | 'update' | 'delete';
  entity:
    | 'author'
    | 'nationality'
    | 'profession'
    | 'tag'
    | 'quote'
    | 'product'
    | 'media'
    | 'category';
  userId: string;
  dataId: string;
  newData: string;
  oldData: string;
}

export const createOne = async (props: CreateOneProps) => {
  const { action, entity, userId, dataId, newData, oldData } = props;

  await prisma.log.capture({
    action,
    entity,
    userId,
    dataId,
    data: newData,
    dataOld: oldData,
  });
};
