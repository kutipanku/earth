import { useState, useRef } from 'react';
import { useNotificationContext } from '@/repository/state/notification';
import { useRouter } from 'next/navigation';
import { useFormControl } from '@mui/material/FormControl';

interface Props<K> {
  name: string;
  identifier: K;
}

const useEdit = <T>({ name, identifier }: Props<keyof T>) => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const bodyRef = useRef<T>();
  const errorRef = useRef<string[]>([]);

  const handleSubmit = (body: T) => {
    // console.warn('[CHECK] form', form);
    bodyRef.current = body;
    setLoading(true);
    fetch(`/api/${name}`, { method: 'POST', body: JSON.stringify(body) })
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
    errors: errorRef.current,
    handleSubmit,
  };
};

export default useEdit;
