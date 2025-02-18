'use client';

import {
  ADD_PAGE_TITLE,
  INPUT_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/profession/constants';
import { convertFromVariable } from '@frontend/entity/profession/functions';
import { useAdd } from '@frontend/usecase/profession';
import {
  UnifiedHeaderDetail,
  UnifiedHeadTag,
  DynamicInput,
} from '../../presentation';
import styles from '../shared/Dashboard.module.css';
import { useState, useRef } from '../../lib/react';
import { useRouter } from '../../lib/next';
import { useNotificationContext } from '../notification';

import type {
  ProfessionField,
  ProfessionVariable,
} from '@frontend/entity/profession/types';

const AddProfessionPage = () => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const formRef = useRef<ProfessionVariable | null>(null);
  const errorRef = useRef<string[] | null>(null);

  const { handleSubmit } = useAdd({
    setLoading: (value: boolean) => setLoading(value),
    navigateTo: (url) => router.replace(url),
    openNotification: (severity, message) =>
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          message,
          severity,
        },
      }),
    updateFormRef: (body) => (formRef.current = body),
    updateErrorRef: (body) => (errorRef.current = body),
  });

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={ADD_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={ADD_PAGE_TITLE} />

        <DynamicInput<ProfessionVariable, ProfessionField, 'key'>
          data={formRef.current || VALUE_PLACEHOLDER}
          fields={INPUT_FIELDS}
          errors={errorRef.current ?? []}
          property='key'
          isLoading={isLoading}
          onSubmit={(newVariables) => {
            const newProfession = convertFromVariable(newVariables);
            handleSubmit(newProfession);
          }}
        />
      </main>
    </div>
  );
};

export default AddProfessionPage;
