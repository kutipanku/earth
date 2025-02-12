import { getNationalityDetail } from '@frontend/repository/api/nationality';

import type { NationalityVariable } from '@frontend/entity/nationality/types';

interface Props {
  id: string;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  setLoading: (value: boolean) => void;
  setDetail: (detail: NationalityVariable) => void;
}

const useShowDetail = ({
  id,
  openNotification,
  setLoading,
  setDetail,
}: Props) => {
  const handleGetDetail = () => {
    if (id) {
      getNationalityDetail(id).then((responseObject) => {
        if (!responseObject.success || responseObject.data === null) {
          openNotification(
            'error',
            `Failed to get nationality, error: ${responseObject.message}`
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
