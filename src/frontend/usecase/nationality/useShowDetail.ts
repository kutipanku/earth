import { getNationalityDetail } from '@frontend/repository/api/nationality';
import type { NationalityDetail } from '@frontend/entity/nationality/types';

interface Props {
  id: string;
  doSetLoading: (value: boolean) => void;
  doSetDetail: (detail: NationalityDetail) => void;
}

const useShowDetail = ({ id, doSetLoading, doSetDetail }: Props) => {
  const handleGetDetail = () => {
    if (id) {
      getNationalityDetail({ id }).then((responseObject) => {
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
