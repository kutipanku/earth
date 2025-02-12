'use client';

import {
  EDIT_PAGE_TITLE,
  INPUT_FIELDS,
  INPUT_VARIABLE,
} from '@frontend/entity/author/constants';
import { useEdit, useShowDetail } from '@frontend/usecase/author';
import { useEffect, useState, useRef } from '../../lib/react';
import { useRouter } from '../../lib/next';
import { useNotificationContext } from '../../view/notification';
import {
  UnifiedHeaderDetail,
  UnifiedHeadTag,
  DynamicInput,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';

import type {
  AuthorDetail,
  AuthorInputField,
  AuthorInput,
} from '@frontend/entity/author/types';

interface AuthorVariablesForEdit extends AuthorInput {
  id: string;
}

const EditAuthorPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<AuthorVariablesForEdit>();
  const errorRef = useRef<string[] | null>(null);

  const { handleGetDetail } = useShowDetail({
    id,
    type: 'edit',
    doSetLoading: (value: boolean) => setLoading(value),
    doSetDetail: (value: AuthorDetail) => setDetail(value),
  });

  const { handleSubmit } = useEdit({
    id,
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

        <DynamicInput<AuthorInput, AuthorInputField, 'key'>
          data={detail || INPUT_VARIABLE}
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

export default EditAuthorPage;
