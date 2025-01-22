import { getProfessionRows } from '@frontend/repository/api/profession';
import type { ProfessionListItem } from '@frontend/repository/api/profession/types';

interface Props {
  page: number;
  rowPerPage: number;
  filterString: string;
  doSetCount: (count: number) => void;
  doSetLoading: (value: boolean) => void;
  doSetList: (list: ProfessionListItem[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filterString,
  doSetCount,
  doSetLoading,
  doSetList,
}: Props) => {
  const handleGetList = (directFilterString?: string) => {
    const currentFilterString = directFilterString || filterString;
    getProfessionRows({
      page,
      rowPerPage,
      filterString: currentFilterString,
    }).then((responseObject) => {
      doSetCount(responseObject.data.total);
      doSetList(responseObject.data.list);
      doSetLoading(false);
    });
  };

  return { handleGetList };
};

export default useList;
