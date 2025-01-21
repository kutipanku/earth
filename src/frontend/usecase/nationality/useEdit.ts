import editNationality from '@frontend/repository/api/nationality/edit';
import type { NationalityVariables } from '@frontend/entity/nationality/types';

interface NationalityVariablesForEdit extends NationalityVariables {
  id: string;
}

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
  const handleSubmit = (body: NationalityVariables) => {
    doSetLoading(true);
    editNationality({ id, data: body })
      .then((responseObject) => {
        if (responseObject.error) {
          doUpdateErrorRef(responseObject.fields || null);
          doOpenNotification(
            'error',
            `Failed to edit nationality, error: ${responseObject.error}`
          );
          doSetLoading(false);
          return;
        }

        doNavigate(`/dashboard/nationality`);
        doUpdateErrorRef(null);
        doOpenNotification(
          'success',
          `Successfully edited new nationality: ${responseObject.data.old.name.eng} to ${responseObject.data.new.name.eng}`
        );
      })
      .catch((err) => {
        doOpenNotification(
          'error',
          `Failed to edit nationality, error: ${err}`
        );
        doSetLoading(false);
      });
  };

  return { handleSubmit };
};

export default useEdit;
