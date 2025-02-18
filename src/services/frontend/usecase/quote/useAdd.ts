import { convertToVariable } from '@frontend/entity/quote/functions';
import { addQuote } from '@frontend/repository/api/quote';

import type { Quote, QuoteVariable } from '@frontend/entity/quote/types';

interface Props {
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doUpdateFormRef: (body: QuoteVariable | null) => void;
  doUpdateErrorRef: (body: string[] | null) => void;
  doSetLoading: (value: boolean) => void;
}

const useAdd = ({
  doNavigate,
  doOpenNotification,
  doUpdateFormRef,
  doUpdateErrorRef,
  doSetLoading,
}: Props) => {
  const handleSubmit = (body: Quote) => {
    const modifiedVariables = convertToVariable(body);
    doUpdateFormRef(modifiedVariables);
    doSetLoading(true);

    addQuote(body)
      .then((responseObject) => {
        if (responseObject.message) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to add quote, error: ${responseObject.message}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate('/dashboard/quote');
        doUpdateFormRef(null);
        doOpenNotification(
          'success',
          `Successfully added new quote: ${responseObject.data?.content.eng}`
        );
      })
      .catch((err) => {
        doOpenNotification('error', `Failed to add quote, error: ${err}`);
        doSetLoading(false);
      });
  };

  return { handleSubmit };
};

export default useAdd;
