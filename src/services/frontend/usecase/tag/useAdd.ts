import { convertToVariable } from '@frontend/entity/tag/functions';
import { addTag } from '@frontend/repository/api/tag';

import type { Tag, TagVariable } from '@frontend/entity/tag/types';

interface Props {
  navigateTo: (url: string) => void;
  openNotification: (
    severity: 'success' | 'info' | 'warning' | 'error',
    message: string
  ) => void;
  updateFormRef: (body: TagVariable | null) => void;
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
  const handleSubmit = (body: Tag) => {
    const modifiedVariables = convertToVariable(body);
    updateFormRef(modifiedVariables);
    setLoading(true);

    addTag(body)
      .then((responseObject) => {
        if (!responseObject.success) {
          updateErrorRef(responseObject.fields || null);
          openNotification(
            'error',
            `Failed to add tag, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        navigateTo('/dashboard/tag');
        updateFormRef(null);
        openNotification(
          'success',
          `Successfully added new tag: ${responseObject.data?.name.eng}`
        );
      })
      .catch((err) => {
        openNotification('error', `Failed to add tag, error: ${err}`);
        setLoading(false);
      });
  };

  return { handleSubmit };
};

export default useAdd;
