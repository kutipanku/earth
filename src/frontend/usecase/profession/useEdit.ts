import { editProfession } from '@frontend/repository/api/profession';
import type { ProfessionVariables } from '@frontend/entity/profession/types';

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
  const handleSubmit = (body: ProfessionVariables) => {
    doSetLoading(true);
    editProfession({ id, data: body })
      .then((responseObject) => {
        if (responseObject.error) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to edit profession, error: ${responseObject.error}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate(`/dashboard/profession`);
        doUpdateErrorRef(null);
        doOpenNotification(
          'success',
          `Successfully edited new profession: ${responseObject.data.old.name.eng} to ${responseObject.data.new.name.eng}`
        );
      })
      .catch((err) => {
        doOpenNotification('error', `Failed to edit profession, error: ${err}`);
        doSetLoading(false);
      });
  };

  return { handleSubmit };
};

export default useEdit;
