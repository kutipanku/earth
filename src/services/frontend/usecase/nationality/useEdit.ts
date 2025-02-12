import { editNationality } from '@frontend/repository/api/nationality';

import type { Nationality } from '@frontend/entity/nationality/types';

interface Props {
  navigateTo: (url: string) => void;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  updateErrorRef: (body: string[] | null) => void;
  setLoading: (value: boolean) => void;
}

const useEdit = ({
  navigateTo,
  openNotification,
  updateErrorRef,
  setLoading,
}: Props) => {
  const handleSubmit = (body: Nationality) => {
    setLoading(true);
    editNationality(body)
      .then((responseObject) => {
        if (!responseObject.success) {
          updateErrorRef(responseObject.fields || null);
          openNotification(
            'error',
            `Failed to edit nationality, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        navigateTo(`/dashboard/nationality`);
        updateErrorRef(null);
        openNotification(
          'success',
          `Successfully edited new nationality: ${responseObject.data?.name.eng}`
        );
      })
      .catch((err) => {
        openNotification('error', `Failed to edit nationality, error: ${err}`);
        setLoading(false);
      });
  };

  return { handleSubmit };
};

export default useEdit;
