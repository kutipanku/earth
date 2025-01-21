import { addNationality } from '@frontend/repository/api/nationality';
import type { NationalityVariables } from '@frontend/entity/nationality/types';

interface Props {
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doUpdateFormRef: (body: NationalityVariables | null) => void;
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
  const handleSubmit = (body: NationalityVariables) => {
    doUpdateFormRef(body);
    doSetLoading(true);

    addNationality({ data: body })
      .then((responseObject) => {
        if (responseObject.error) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to add nationality, error: ${responseObject.error}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate('/dashboard/nationality');
        doUpdateFormRef(null);
        doOpenNotification(
          'success',
          `Successfully added new nationality: ${responseObject.data.name.eng}`
        );
      })
      .catch((err) => {
        doOpenNotification('error', `Failed to add nationality, error: ${err}`);
        doSetLoading(false);
      });
  };

  return { handleSubmit };
};

export default useAdd;
