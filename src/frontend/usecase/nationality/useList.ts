import { getNationalityRows } from '@frontend/repository/api/nationality';
import type { NationalityListItem } from '@frontend/repository/api/nationality/types';

interface Props {
  page: number;
  rowPerPage: number;
  filterString: string;
  doSetCount: (count: number) => void;
  doSetLoading: (value: boolean) => void;
  doSetList: (list: NationalityListItem[]) => void;
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
    getNationalityRows({
      page,
      rowPerPage,
      filterString: currentFilterString,
    }).then((responseObject) => {
      console.warn('[DEBUG] currentFilterString', currentFilterString);
      console.warn(
        '[DEBUG] responseObject.data.list',
        responseObject.data.list
      );
      doSetCount(responseObject.data.total);
      doSetList(responseObject.data.list);
      doSetLoading(false);
    });
  };

  return { handleGetList };
};

export default useList;
