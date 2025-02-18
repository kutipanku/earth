import { getQuoteRows } from '@frontend/repository/api/quote';

import type { Quote, QuoteFilter } from '@frontend/entity/quote/types';

interface Props {
  page: number;
  rowPerPage: number;
  filter: QuoteFilter;
  setCount: (count: number) => void;
  setLoading: (value: boolean) => void;
  setList: (list: Quote[]) => void;
}

const useList = ({
  page,
  rowPerPage,
  filter,
  setCount,
  setLoading,
  setList,
}: Props) => {
  const handleGetList = (directFilterString?: QuoteFilter) => {
    getQuoteRows({
      page,
      rowPerPage,
      filter: directFilterString || filter,
    }).then((responseObject) => {
      setCount(responseObject.data.total);
      setList(responseObject.data.list);
      setLoading(false);
    });
  };

  return { handleGetList };
};

export default useList;
