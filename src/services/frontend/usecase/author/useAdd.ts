import { addAuthor } from '@frontend/repository/api/author';
import type { AuthorInput } from '@frontend/entity/author/types';

interface Props {
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doUpdateFormRef: (body: AuthorInput | null) => void;
  doUpdateErrorRef: (body: string[] | null) => void;
  doSetLoading: (value: boolean) => void;
}

const useAdd = ({
  doNavigate,
  doOpenNotification,
  doUpdateFormRef,
  doUpdateErrorRef,
  doSetLoading,
}: Props) => {
  const handleSubmit = (body: AuthorInput) => {
    doUpdateFormRef(body);
    doSetLoading(true);

    addAuthor({ data: body })
      .then((responseObject) => {
        if (responseObject.error) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to add author, error: ${responseObject.error}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate('/dashboard/author');
        doUpdateFormRef(null);
        doOpenNotification(
          'success',
          `Successfully added new author: ${responseObject.data.name}`
        );
      })
      .catch((err) => {
        doOpenNotification('error', `Failed to add author, error: ${err}`);
        doSetLoading(false);
      });
  };

  return { handleSubmit };
};

export default useAdd;
