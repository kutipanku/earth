import { getAuthorDetail } from '@frontend/repository/api/author';
import type { AuthorDetail } from '@frontend/entity/author/types';

interface Props {
  id: string;
  type?: 'default' | 'edit';
  doSetLoading: (value: boolean) => void;
  doSetDetail: (detail: AuthorDetail) => void;
}

const useShowDetail = ({
  id,
  type = 'default',
  doSetLoading,
  doSetDetail,
}: Props) => {
  const handleGetDetail = () => {
    if (id) {
      getAuthorDetail({ id, type }).then((responseObject) => {
        doSetDetail(responseObject.data);
        doSetLoading(false);
      });
    } else {
      doSetLoading(false);
    }
  };

  return { handleGetDetail };
};

export default useShowDetail;
