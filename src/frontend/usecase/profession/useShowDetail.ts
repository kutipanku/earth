import { getProfessionDetail } from '@frontend/repository/api/profession';
import type { ProfessionDetail } from '@frontend/entity/profession/types';

interface Props {
  id: string;
  doSetLoading: (value: boolean) => void;
  doSetDetail: (detail: ProfessionDetail) => void;
}

const useShowDetail = ({ id, doSetLoading, doSetDetail }: Props) => {
  const handleGetDetail = () => {
    if (id) {
      getProfessionDetail({ id }).then((responseObject) => {
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
