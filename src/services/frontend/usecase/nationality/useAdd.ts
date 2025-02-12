import { convertToVariable } from '@frontend/entity/nationality/functions';
import { addNationality } from '@frontend/repository/api/nationality';

import type {
  Nationality,
  NationalityVariable,
} from '@frontend/entity/nationality/types';

interface Props {
  navigateTo: (url: string) => void;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  updateFormRef: (body: NationalityVariable | null) => void;
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
  const handleSubmit = (body: Nationality) => {
    const modifiedVariables = convertToVariable(body);
    updateFormRef(modifiedVariables);
    setLoading(true);

    addNationality(body)
      .then((responseObject) => {
        if (!responseObject.success) {
          updateErrorRef(responseObject.fields || null);
          openNotification(
            'error',
            `Failed to add nationality, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        navigateTo('/dashboard/nationality');
        updateFormRef(null);
        openNotification(
          'success',
          `Successfully added new nationality: ${responseObject.data?.name.eng}`
        );
      })
      .catch((err) => {
        openNotification('error', `Failed to add nationality, error: ${err}`);
        setLoading(false);
      });
  };

  return { handleSubmit };
};

export default useAdd;
