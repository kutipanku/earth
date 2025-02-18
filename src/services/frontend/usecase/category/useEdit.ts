import { editCategory } from '@frontend/repository/api/category';

import type { Category } from '@frontend/entity/category/types';

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
  const handleSubmit = (body: Category) => {
    setLoading(true);
    editCategory(body)
      .then((responseObject) => {
        if (!responseObject.success) {
          updateErrorRef(responseObject.fields || null);
          openNotification(
            'error',
            `Failed to edit category, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        navigateTo('/dashboard/category');
        updateErrorRef(null);
        openNotification(
          'success',
          `Successfully edited new category: ${responseObject.data?.name.eng}`
        );
      })
      .catch((err) => {
        openNotification('error', `Failed to edit category, error: ${err}`);
        setLoading(false);
      });
  };

  return { handleSubmit };
};

export default useEdit;
