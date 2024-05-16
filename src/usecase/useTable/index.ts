import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useNotificationContext } from '@/repository/state/notification';
interface Props {
  name: string;
  identifier: string;
}

const useTable = <T>({ name, identifier }: Props) => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<null | { row: Record<string, string> }>(null);

  useEffect(() => {
    fetch(`/api/${name}?page=${page}&limit=${rowPerPage}`)
      .then((res) => res.json())
      .then((resObject) => {
        setData(resObject.data);
        setCount(resObject.total);
        setLoading(false);
      });
  }, [name, page, rowPerPage]);

  const handleOnDelete = useCallback(() => {
    if (selectedRow !== null) {
      // @ts-ignore
      fetch(`/api/${name}/${selectedRow.id}`, { method: 'DELETE' })
        .then((res) => res.json())
        .then(() => {
          setDeleteDialogOpen(false);
          dispatch({
            type: 'OPEN_NOTIFICATION',
            payload: {
              message: `Successfully delete ${name} with name: ${selectedRow?.row[identifier]}`,
              severity: 'success',
            },
          });
          setSelectedRow(null);

          setLoading(true);
          fetch(`/api/${name}?page=${page}&limit=${rowPerPage}`)
            .then((res) => res.json())
            .then((resObject) => {
              setData(resObject.data);
              setCount(resObject.total);
              setLoading(false);
            });
        });
    }
  }, [selectedRow, name, dispatch, identifier, page, rowPerPage]);

  const handleTriggerAction = (type: string, rowData: any) => {
    if (type === 'view') {
      router.push(`/dashboard/${name}/${rowData.row.id}`);
    } else if (type === 'edit') {
      router.push(`/dashboard/${name}/${rowData.row.id}/edit`);
    } else {
      setSelectedRow(rowData);
      setDeleteDialogOpen(true);
    }
  };

  const handleApplyFilter = (joinedFilter: string) => {
    setLoading(true);
    fetch(`/api/${name}?page=${page}&limit=${rowPerPage}&${joinedFilter}`)
      .then((res) => res.json())
      .then((resObject) => {
        setData(resObject.data);
        setCount(resObject.total);
        setLoading(false);
      });
  };

  const handleRedirectToAddPage = () => {
    router.push(`/dashboard/${name}/add`);
  };

  return {
    isLoading,
    data,
    count,
    page,
    rowPerPage,
    deleteDialogOpen,
    selectedRow,
    setPage,
    setRowPerPage,
    setDeleteDialogOpen,
    setSelectedRow,
    handleTriggerAction,
    handleOnDelete,
    handleRedirectToAddPage,
    handleApplyFilter,
  };
};

export default useTable;
