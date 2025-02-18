'use client';

import {
  ADD_PAGE_TITLE,
  INPUT_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/author/constants';
import { convertFromVariable } from '@frontend/entity/author/functions';
import { useAdd } from '@frontend/usecase/author';
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
  AuthorField,
  AuthorVariable,
} from '@frontend/entity/author/types';

const AddAuthorPage = () => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const formRef = useRef<AuthorVariable | null>(null);
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

        <DynamicInput<AuthorVariable, AuthorField, 'key'>
          data={formRef.current || VALUE_PLACEHOLDER}
          fields={INPUT_FIELDS}
          errors={errorRef.current ?? []}
          property='key'
          isLoading={isLoading}
          onSubmit={(newVariables) => {
            const newAuthor = convertFromVariable(newVariables);
            handleSubmit(newAuthor);
          }}
        />
      </main>
    </div>
  );
};

export default AddAuthorPage;
