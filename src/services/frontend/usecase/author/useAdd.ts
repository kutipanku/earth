import { convertToVariable } from '@frontend/entity/author/functions';
import { addAuthor } from '@frontend/repository/api/author';

import type { Author, AuthorVariable } from '@frontend/entity/author/types';

interface Props {
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doUpdateFormRef: (body: AuthorVariable | null) => void;
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
  const handleSubmit = (body: Author) => {
    const modifiedVariables = convertToVariable(body);
    doUpdateFormRef(modifiedVariables);
    doSetLoading(true);

    addAuthor(body)
      .then((responseObject) => {
        if (responseObject.message) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to add author, error: ${responseObject.message}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate('/dashboard/author');
        doUpdateFormRef(null);
        doOpenNotification(
          'success',
          `Successfully added new author: ${responseObject.data?.name}`
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
