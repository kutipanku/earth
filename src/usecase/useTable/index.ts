import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  name: string;
}

const useTable = ({ name }: Props) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    fetch(`/api/${name}?page=${page}&limit=${rowPerPage}`)
      .then((res) => res.json())
      .then((resObject) => {
        setData(resObject.data);
        setCount(resObject.total);
        setLoading(false);
      });
  }, [name, page, rowPerPage]);

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

  return {
    isLoading,
    data,
    count,
    page,
    rowPerPage,
    deleteDialogOpen,
    selectedRow,
    setLoading,
    setData,
    setCount,
    setPage,
    setRowPerPage,
    handleTriggerAction,
  };
};

export default useTable;
