import { useEffect, useState } from 'react';

interface Props {
  id: string;
  name: string;
}

const useDetail = <T>({ id, name }: Props) => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<T>();

  useEffect(() => {
    if (id) {
      fetch(`/api/${name}/${id}`)
        .then((res) => res.json())
        .then((responseObject) => {
          setLoading(false);
          setDetail(responseObject.data);
        });
    }
  }, [id, name]);

  return {
    detail,
    isLoading,
  };
};

export default useDetail;
