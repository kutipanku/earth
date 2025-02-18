import { editQuote } from '@frontend/repository/api/quote';

import type { Quote } from '@frontend/entity/quote/types';

interface Props {
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doUpdateErrorRef: (body: string[] | null) => void;
  doSetLoading: (value: boolean) => void;
}

const useEdit = ({
  doNavigate,
  doOpenNotification,
  doUpdateErrorRef,
  doSetLoading,
}: Props) => {
  const handleSubmit = (body: Quote) => {
    doSetLoading(true);
    editQuote(body)
      .then((responseObject) => {
        if (responseObject.message) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to edit quote, error: ${responseObject.message}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate('/dashboard/quote');
        doUpdateErrorRef(null);
        doOpenNotification(
          'success',
          `Successfully edited new quote: ${responseObject.data?.content.eng}`
        );
      })
      .catch((err) => {
        doOpenNotification('error', `Failed to edit quote, error: ${err}`);
        doSetLoading(false);
      });
  };

  return { handleSubmit };
};

export default useEdit;
