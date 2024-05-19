import { useState } from 'react';
import { useNotificationContext } from '@/repository/state/notification';
import { useRouter } from 'next/navigation';

interface Props<K> {
  name: string;
  identifier: K;
}

const useAdd = <T>({ name, identifier }: Props<keyof T>) => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);

  const handleSubmit = (body: T) => {
    setLoading(true);
    fetch(`/api/${name}`, { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        if (responseObject.error) {
          dispatch({
            type: 'OPEN_NOTIFICATION',
            payload: {
              message: `Failed to add ${name}, error: ${responseObject.error}`,
              severity: 'error',
            },
          });
          setLoading(false);
          return;
        }

        router.replace(`/dashboard/${name}`);
        dispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            message: `Successfully added new ${name}: ${responseObject[identifier]}`,
            severity: 'success',
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            message: `Failed to add ${name}, error: ${err}`,
            severity: 'error',
          },
        });
        setLoading(false);
      });
  };

  return {
    isLoading,
    handleSubmit,
  };
};

export default useAdd;
