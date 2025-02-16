import { convertToVariable } from '@frontend/entity/category/functions';
import { addCategory } from '@frontend/repository/api/category';

import type {
  Category,
  CategoryVariable,
} from '@frontend/entity/category/types';

interface Props {
  navigateTo: (url: string) => void;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  updateFormRef: (body: CategoryVariable | null) => void;
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
  const handleSubmit = (body: Category) => {
    const modifiedVariables = convertToVariable(body);
    updateFormRef(modifiedVariables);
    setLoading(true);

    addCategory(body)
      .then((responseObject) => {
        if (!responseObject.success) {
          updateErrorRef(responseObject.fields || null);
          openNotification(
            'error',
            `Failed to add category, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        navigateTo('/dashboard/category');
        updateFormRef(null);
        openNotification(
          'success',
          `Successfully added new category: ${responseObject.data?.name.eng}`
        );
      })
      .catch((err) => {
        openNotification('error', `Failed to add category, error: ${err}`);
        setLoading(false);
      });
  };

  return { handleSubmit };
};

export default useAdd;
