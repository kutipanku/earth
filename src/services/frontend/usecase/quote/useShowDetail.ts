import { getQuoteDetail } from '@frontend/repository/api/quote';

import type { QuoteVariable } from '@frontend/entity/quote/types';

interface Props {
  id: string;
  type: 'detail' | 'edit';
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  setLoading: (value: boolean) => void;
  setDetail: (detail: QuoteVariable) => void;
}

const useShowDetail = ({
  id,
  type,
  openNotification,
  setLoading,
  setDetail,
}: Props) => {
  const handleGetDetail = () => {
    if (id) {
      getQuoteDetail(id, type).then((responseObject) => {
        if (!responseObject.success || responseObject.data === null) {
          openNotification(
            'error',
            `Failed to get quote, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        setDetail(responseObject.data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  };

  return { handleGetDetail };
};

export default useShowDetail;
