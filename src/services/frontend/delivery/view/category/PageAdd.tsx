'use client';

import {
  ADD_PAGE_TITLE,
  INPUT_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/category/constants';
import { convertFromVariable } from '@frontend/entity/category/functions';
import { useAdd } from '@frontend/usecase/category';
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
  CategoryField,
  CategoryVariable,
} from '@frontend/entity/category/types';

const AddCategoryPage = () => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const formRef = useRef<CategoryVariable | null>(null);
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

        <DynamicInput<CategoryVariable, CategoryField, 'key'>
          property='key'
          isLoading={isLoading}
          data={formRef.current || VALUE_PLACEHOLDER}
          fields={INPUT_FIELDS}
          errors={errorRef.current ?? []}
          onSubmit={(newVariables) => {
            const newCategory = convertFromVariable(newVariables);
            handleSubmit(newCategory);
          }}
        />
      </main>
    </div>
  );
};

export default AddCategoryPage;
