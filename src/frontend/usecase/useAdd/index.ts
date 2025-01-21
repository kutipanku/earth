import { useState, useRef } from 'react';
import { useNotificationContext } from '@/repository/state/notification';
import { useRouter } from 'next/navigation';
import create from '@/frontend/repository/api/core/create';

interface Props<K, L> {
  name: string;
  identifier: keyof K;
  normalizer: (fieldData: K) => L;
}

const useEdit = <T, U>({ name, identifier, normalizer }: Props<T, U>) => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const bodyRef = useRef<T>();
  const errorRef = useRef<string[]>();

  const handleSubmit = (body: T) => {
    bodyRef.current = body;
    setLoading(true);
    create<U>({ identifier: name, body: normalizer(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        if (responseObject.error) {
          errorRef.current = responseObject.fields;
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
        bodyRef.current = undefined;
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
    body: bodyRef.current,
    errors: errorRef.current ? errorRef.current : [],
    handleSubmit,
  };
};

export default useEdit;
