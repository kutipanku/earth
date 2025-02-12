import { getAuthorRows } from '@frontend/repository/api/author';
import type { AuthorListItem } from '@frontend/repository/api/author/types';

interface Props {
  page: number;
  rowPerPage: number;
  filterString: string;
  doSetCount: (count: number) => void;
  doSetLoading: (value: boolean) => void;
  doSetList: (list: AuthorListItem[]) => void;
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
    getAuthorRows({
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
