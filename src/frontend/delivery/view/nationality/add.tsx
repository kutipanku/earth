'use client';

import {
  ADD_PAGE_TITLE,
  INPUT_FIELDS,
  INPUT_VARIABLE,
} from '@frontend/entity/nationality/constants';
import { useAdd } from '@frontend/usecase/nationality';
import {
  UnifiedHeaderDetail,
  UnifiedHeadTag,
  DynamicInput,
} from '@frontend/delivery/presentation';
import type {
  NationalityInputField,
  NationalityVariables,
} from '@frontend/entity/nationality/types';
import styles from '@/styles/Dashboard.module.css';
import { useState, useRef } from '../../lib/react';
import { useRouter } from '../../lib/next';
import { useNotificationContext } from '../../view/notification';

const AddNationalityPage = () => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const formRef = useRef<NationalityVariables | null>(null);
  const errorRef = useRef<string[] | null>(null);

  const { handleSubmit } = useAdd({
    doSetLoading: (value: boolean) => setLoading(value),
    doNavigate: (url) => router.replace(url),
    doOpenNotification: (severity, message) =>
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          message,
          severity,
        },
      }),
    doUpdateFormRef: (body) => (formRef.current = body),
    doUpdateErrorRef: (body) => (errorRef.current = body),
  });

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={ADD_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={ADD_PAGE_TITLE} />

        <DynamicInput<NationalityVariables, NationalityInputField, 'key'>
          data={formRef.current || INPUT_VARIABLE}
          fields={INPUT_FIELDS}
          errors={errorRef.current ?? []}
          property='key'
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default AddNationalityPage;
