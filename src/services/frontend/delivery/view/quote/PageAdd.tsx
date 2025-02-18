'use client';

import {
  ADD_PAGE_TITLE,
  INPUT_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/quote/constants';
import { convertFromVariable } from '@frontend/entity/quote/functions';
import { useAdd } from '@frontend/usecase/quote';
import {
  UnifiedHeaderDetail,
  UnifiedHeadTag,
  DynamicInput,
} from '../../presentation';
import styles from '../shared/Dashboard.module.css';
import { useState, useRef } from '../../lib/react';
import { useRouter } from '../../lib/next';
import { useNotificationContext } from '../notification';

import type { QuoteField, QuoteVariable } from '@frontend/entity/quote/types';

const AddQuotePage = () => {
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(false);
  const formRef = useRef<QuoteVariable | null>(null);
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

        <DynamicInput<QuoteVariable, QuoteField, 'key'>
          data={formRef.current || VALUE_PLACEHOLDER}
          fields={INPUT_FIELDS}
          errors={errorRef.current ?? []}
          property='key'
          isLoading={isLoading}
          onSubmit={(newVariables) => {
            const newQuote = convertFromVariable(newVariables);
            handleSubmit(newQuote);
          }}
        />
      </main>
    </div>
  );
};

export default AddQuotePage;
