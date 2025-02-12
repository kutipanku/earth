import { useEffect, useState } from 'react';

import readDetail from '@/frontend/repository/api/shared/fetcher/read-detail';

interface Props {
  id: string;
  name: string;
}

const useDetail = <T>({ id, name }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<T>();

  useEffect(() => {
    if (id) {
      readDetail({ identifier: name, id })
        .then((res) => res.json())
        .then((responseObject) => {
          setDetail(responseObject.data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [id, name]);

  return {
    detail,
    isLoading,
  };
};

export default useDetail;
