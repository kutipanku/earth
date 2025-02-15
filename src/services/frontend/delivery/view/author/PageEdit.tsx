'use client';

import {
  EDIT_PAGE_TITLE,
  INPUT_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/author/constants';
import { convertFromVariable } from '@frontend/entity/author/functions';
import { useEdit, useShowDetail } from '@frontend/usecase/author';
import { useEffect, useState, useRef } from '../../lib/react';
import { useRouter } from '../../lib/next';
import { useNotificationContext } from '../notification';
import {
  UnifiedHeaderDetail,
  UnifiedHeadTag,
  DynamicInput,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';

import type {
  AuthorField,
  AuthorVariable,
} from '@frontend/entity/author/types';

const EditAuthorPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<AuthorVariable>();
  const errorRef = useRef<string[] | null>(null);

  const { handleGetDetail } = useShowDetail({
    id,
    openNotification: (severity, message) =>
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          message,
          severity,
        },
      }),
    setLoading: (value: boolean) => setLoading(value),
    setDetail: (value: AuthorVariable) => setDetail(value),
  });

  const { handleSubmit } = useEdit({
    doNavigate: (url) => router.replace(url),
    doOpenNotification: (severity, message) =>
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          message,
          severity,
        },
      }),
    doUpdateErrorRef: (body) => (errorRef.current = body),
    doSetLoading: (value: boolean) => setLoading(value),
  });

  useEffect(() => {
    handleGetDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={EDIT_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={EDIT_PAGE_TITLE} />

        <DynamicInput<AuthorVariable, AuthorField, 'key'>
          data={detail || VALUE_PLACEHOLDER}
          fields={INPUT_FIELDS}
          errors={errorRef.current ?? []}
          property='key'
          isLoading={isLoading}
          onSubmit={(modifiedVariables) => {
            const modifiedAuthor = convertFromVariable(modifiedVariables);
            handleSubmit(modifiedAuthor);
          }}
        />
      </main>
    </div>
  );
};

export default EditAuthorPage;
