'use client';

import {
  EDIT_PAGE_TITLE,
  INPUT_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/nationality/constants';
import { convertFromVariable } from '@frontend/entity/nationality/functions';
import { useEdit, useShowDetail } from '@frontend/usecase/nationality';
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
  NationalityVariable,
  NationalityField,
} from '@frontend/entity/nationality/types';

const EditNationalityPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<NationalityVariable>();
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
    setDetail: (value: NationalityVariable) => setDetail(value),
  });

  const { handleSubmit } = useEdit({
    navigateTo: (url) => router.replace(url),
    openNotification: (severity, message) =>
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          message,
          severity,
        },
      }),
    updateErrorRef: (body) => (errorRef.current = body),
    setLoading: (value: boolean) => setLoading(value),
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

        <DynamicInput<NationalityVariable, NationalityField, 'key'>
          data={detail || VALUE_PLACEHOLDER}
          fields={INPUT_FIELDS}
          errors={errorRef.current ?? []}
          property='key'
          isLoading={isLoading}
          onSubmit={(modifiedVariables) => {
            const modifiedNationality = convertFromVariable(modifiedVariables);
            handleSubmit(modifiedNationality);
          }}
        />
      </main>
    </div>
  );
};

export default EditNationalityPage;
