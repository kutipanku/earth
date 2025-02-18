import { getCategoryDetail } from '@frontend/repository/api/category';

import type { CategoryVariable } from '@frontend/entity/category/types';

interface Props {
  id: string;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  setLoading: (value: boolean) => void;
  setDetail: (detail: CategoryVariable) => void;
}

const useShowDetail = ({
  id,
  openNotification,
  setLoading,
  setDetail,
}: Props) => {
  const handleGetDetail = () => {
    if (id) {
      getCategoryDetail(id).then((responseObject) => {
        if (!responseObject.success || responseObject.data === null) {
          openNotification(
            'error',
            `Failed to get category, error: ${responseObject.message}`
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
