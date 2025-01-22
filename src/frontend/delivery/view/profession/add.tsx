'use client';

import {
  ADD_PAGE_TITLE,
  INPUT_FIELDS,
  INPUT_VARIABLE,
} from '@frontend/entity/profession/constants';
import { useAdd } from '@frontend/usecase/profession';
import {
  UnifiedHeaderDetail,
  UnifiedHeadTag,
  DynamicInput,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';
import { useState, useRef } from '../../lib/react';
import { useRouter } from '../../lib/next';
import { useNotificationContext } from '../../view/notification';

import type {
  ProfessionInputField,
  ProfessionVariables,
} from '@frontend/entity/profession/types';

const AddProfessionPage = () => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const formRef = useRef<ProfessionVariables | null>(null);
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

        <DynamicInput<ProfessionVariables, ProfessionInputField, 'key'>
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

export default AddProfessionPage;
