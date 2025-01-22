import { addProfession } from '@frontend/repository/api/profession';
import type { ProfessionVariables } from '@frontend/entity/profession/types';

interface Props {
  doNavigate: (url: string) => void;
  doOpenNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  doUpdateFormRef: (body: ProfessionVariables | null) => void;
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
  const handleSubmit = (body: ProfessionVariables) => {
    doUpdateFormRef(body);
    doSetLoading(true);

    addProfession({ data: body })
      .then((responseObject) => {
        if (responseObject.error) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to add profession, error: ${responseObject.error}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate('/dashboard/profession');
        doUpdateFormRef(null);
        doOpenNotification(
          'success',
          `Successfully added new profession: ${responseObject.data.name.eng}`
        );
      })
      .catch((err) => {
        doOpenNotification('error', `Failed to add profession, error: ${err}`);
        doSetLoading(false);
      });
  };

  return { handleSubmit };
};

export default useAdd;
