import { getAuthorDetail } from '@frontend/repository/api/author';

import type { AuthorVariable } from '@frontend/entity/author/types';

interface Props {
  id: string;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  setLoading: (value: boolean) => void;
  setDetail: (detail: AuthorVariable) => void;
}

const useShowDetail = ({
  id,
  openNotification,
  setLoading,
  setDetail,
}: Props) => {
  const handleGetDetail = () => {
    if (id) {
      getAuthorDetail(id).then((responseObject) => {
        if (!responseObject.success || responseObject.data === null) {
          openNotification(
            'error',
            `Failed to get author, error: ${responseObject.message}`
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
