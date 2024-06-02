import { useEffect, useState, useRef } from 'react';
import { useNotificationContext } from '@/repository/state/notification';
import { useRouter } from 'next/navigation';

interface Props<K> {
  id: string;
  name: string;
  identifier: K;
}

const useAdd = <T>({ id, name, identifier }: Props<keyof T>) => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<T>();
  const errorRef = useRef<string[]>();

  useEffect(() => {
    if (id) {
      fetch(`/api/${name}/${id}`)
        .then((res) => res.json())
        .then((responseObject) => {
          setDetail(responseObject.data);
          setLoading(false);
        });
    }
  }, [id, name]);

  const handleSubmit = (body: T) => {
    setLoading(true);
    setDetail(body);
    fetch(`/api/${name}/${id}`, { method: 'PUT', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        if (responseObject.error) {
          errorRef.current = responseObject.fields;
          dispatch({
            type: 'OPEN_NOTIFICATION',
            payload: {
              message: `Failed to edit ${name}, error: ${responseObject.error}`,
              severity: 'error',
            },
          });
          setLoading(false);
          return;
        }

        router.replace(`/dashboard/${name}`);
        errorRef.current = undefined;
        dispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            message: `Successfully edited new ${name}: ${responseObject.data[identifier]}`,
            severity: 'success',
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            message: `Failed to edit ${name}, error: ${err}`,
            severity: 'error',
          },
        });
        setLoading(false);
      });
  };

  return {
    isLoading,
    detail,
    errors: errorRef.current ? errorRef.current : [],
    handleSubmit,
  };
};

export default useAdd;
