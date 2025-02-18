import { editTag } from '@frontend/repository/api/tag';

import type { Tag } from '@frontend/entity/tag/types';

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
  const handleSubmit = (body: Tag) => {
    setLoading(true);
    editTag(body)
      .then((responseObject) => {
        if (!responseObject.success) {
          updateErrorRef(responseObject.fields || null);
          openNotification(
            'error',
            `Failed to edit tag, error: ${responseObject.message}`
          );
          setLoading(false);
          return;
        }

        navigateTo('/dashboard/tag');
        updateErrorRef(null);
        openNotification(
          'success',
          `Successfully edited new tag: ${responseObject.data?.name.eng}`
        );
      })
      .catch((err) => {
        openNotification('error', `Failed to edit tag, error: ${err}`);
        setLoading(false);
      });
  };

  return { handleSubmit };
};

export default useEdit;
