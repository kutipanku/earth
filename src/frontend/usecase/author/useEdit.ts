import { editAuthor } from '@frontend/repository/api/author';
import type { AuthorInput } from '@frontend/entity/author/types';

interface Props {
  id: string;
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doUpdateErrorRef: (body: string[] | null) => void;
  doSetLoading: (value: boolean) => void;
}

const useEdit = ({
  id,
  doNavigate,
  doOpenNotification,
  doUpdateErrorRef,
  doSetLoading,
}: Props) => {
  const handleSubmit = (body: AuthorInput) => {
    doSetLoading(true);
    editAuthor({ id, data: body })
      .then((responseObject) => {
        if (responseObject.error) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to edit author, error: ${responseObject.error}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate(`/dashboard/author`);
        doUpdateErrorRef(null);
        doOpenNotification(
          'success',
          `Successfully edited new author: ${responseObject.data.name}`
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
