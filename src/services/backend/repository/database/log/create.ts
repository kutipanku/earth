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
  adminId: string;
  dataId: string;
  newData: string;
  oldData: string;
}

export const createOne = async (props: CreateOneProps) => {
  const { action, entity, adminId, dataId, newData, oldData } = props;

  await prisma.log.capture({
    action,
    entity,
    adminId,
    dataId,
    data: newData,
    dataOld: oldData,
  });
};
