import { getProfessionDetail } from '@frontend/repository/api/profession';

import type { ProfessionVariable } from '@frontend/entity/profession/types';

interface Props {
  id: string;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  setLoading: (value: boolean) => void;
  setDetail: (detail: ProfessionVariable) => void;
}

const useShowDetail = ({
  id,
  openNotification,
  setLoading,
  setDetail,
}: Props) => {
  const handleGetDetail = () => {
    if (id) {
      getProfessionDetail(id).then((responseObject) => {
        if (!responseObject.success || responseObject.data === null) {
          openNotification(
            'error',
            `Failed to get profession, error: ${responseObject.message}`
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
