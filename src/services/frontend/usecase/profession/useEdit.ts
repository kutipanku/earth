import { editProfession } from '@frontend/repository/api/profession';

import type { Profession } from '@frontend/entity/profession/types';

interface Props {
  id: string;
  navigateTo: (url: string) => void;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  updateErrorRef: (body: string[] | null) => void;
  setLoading: (value: boolean) => void;
}

const useEdit = ({
  id,
  navigateTo,
  openNotification,
  updateErrorRef,
  setLoading,
}: Props) => {
  const handleSubmit = (body: Profession) => {
    setLoading(true);
    editProfession(body)
      .then((responseObject) => {
        if (!responseObject.success) {
          updateErrorRef(responseObject.fields || null);
          openNotification(
            'error',
            `Failed to edit profession, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        navigateTo(`/dashboard/profession`);
        updateErrorRef(null);
        openNotification(
          'success',
          `Successfully edited new profession: ${responseObject.data?.name.eng}`
        );
      })
      .catch((err) => {
        openNotification('error', `Failed to edit profession, error: ${err}`);
        setLoading(false);
      });
  };

  return { handleSubmit };
};

export default useEdit;
