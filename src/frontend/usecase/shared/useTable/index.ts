import { useCallback, useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';

import readRows from '@/frontend/repository/api/shared/fetcher/read-rows';
import deleteRow from '@/frontend/repository/api/shared/fetcher/delete';
import type { Filter } from '@/frontend/entity/shared/types';
import { useNotificationContext } from '@/repository/state/notification';
interface Props {
  name: string;
  filter: Filter[];
  identifier?: string;
  rowPerPage?: number;
}

type Row = Record<string, string>;

const useTable = <T>({
  name,
  identifier = '',
  filter,
  rowPerPage: defaultRowPerPage = 10,
}: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [dispatch] = useNotificationContext();

  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(defaultRowPerPage);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<null | { row: Row }>(null);

  const filterString = useMemo(() => {
    const filterArray: string[] = [];
    filter.forEach((filterKey) => {
      const searchParam = searchParams.get(filterKey.key);

      if (searchParam) {
        filterArray.push(filterKey.key + '=' + searchParam);
      }
    });

    return filterArray.join('&');
  }, [filter, searchParams]);

  useEffect(() => {
    readRows({ identifier: name, page, rowPerPage, filterString })
      .then((res) => res.json())
      .then((resObject) => {
        setData(resObject.data.list);
        setCount(resObject.data.total);
        setLoading(false);
      });
  }, [filterString, name, page, rowPerPage]);

  const handleOnDelete = useCallback(() => {
    if (selectedRow !== null) {
      // @ts-ignore
      deleteRow({ identifier: name, id })
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
          readRows({ identifier: name, page, rowPerPage, filterString })
            .then((res) => res.json())
            .then((resObject) => {
              setData(resObject.data.list);
              setCount(resObject.data.total);
              setLoading(false);
            });
        });
    }
  }, [selectedRow, name, dispatch, identifier, page, rowPerPage, filterString]);

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
    window.history.replaceState({}, '', `?${joinedFilter}`);
    readRows({ identifier: name, page, rowPerPage, filterString })
      .then((res) => res.json())
      .then((resObject) => {
        setData(resObject.data.list);
        setCount(resObject.data.total);
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
