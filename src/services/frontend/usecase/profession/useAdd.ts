import { convertToVariable } from '@frontend/entity/profession/functions';
import { addProfession } from '@frontend/repository/api/profession';

import type {
  Profession,
  ProfessionVariable,
} from '@frontend/entity/profession/types';

interface Props {
  navigateTo: (url: string) => void;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  updateFormRef: (body: ProfessionVariable | null) => void;
  updateErrorRef: (body: string[] | null) => void;
  setLoading: (value: boolean) => void;
}

const useAdd = ({
  navigateTo,
  openNotification,
  updateFormRef,
  updateErrorRef,
  setLoading,
}: Props) => {
  const handleSubmit = (body: Profession) => {
    const modifiedVariables = convertToVariable(body);
    updateFormRef(modifiedVariables);
    setLoading(true);

    addProfession(body)
      .then((responseObject) => {
        if (!responseObject.success) {
          updateErrorRef(responseObject.fields || null);
          openNotification(
            'error',
            `Failed to add profession, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        navigateTo('/dashboard/profession');
        updateFormRef(null);
        openNotification(
          'success',
          `Successfully added new profession: ${responseObject.data?.name.eng}`
        );
      })
      .catch((err) => {
        openNotification('error', `Failed to add profession, error: ${err}`);
        setLoading(false);
      });
  };

  return { handleSubmit };
};

export default useAdd;
