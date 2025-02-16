import { editAuthor } from '@frontend/repository/api/author';

import type { Author } from '@frontend/entity/author/types';

interface Props {
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doUpdateErrorRef: (body: string[] | null) => void;
  doSetLoading: (value: boolean) => void;
}

const useEdit = ({
  doNavigate,
  doOpenNotification,
  doUpdateErrorRef,
  doSetLoading,
}: Props) => {
  const handleSubmit = (body: Author) => {
    doSetLoading(true);
    editAuthor(body)
      .then((responseObject) => {
        if (responseObject.message) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to edit author, error: ${responseObject.message}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate('/dashboard/author');
        doUpdateErrorRef(null);
        doOpenNotification(
          'success',
          `Successfully edited new author: ${responseObject.data?.name}`
        );
      })
      .catch((err) => {
        doOpenNotification('error', `Failed to edit author, error: ${err}`);
        doSetLoading(false);
      });
  };

  return { handleSubmit };
};

export default useEdit;
