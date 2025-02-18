'use client';

import {
  EDIT_PAGE_TITLE,
  INPUT_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/profession/constants';
import { convertFromVariable } from '@frontend/entity/profession/functions';
import { useEdit, useShowDetail } from '@frontend/usecase/profession';
import { useEffect, useState, useRef } from '../../lib/react';
import { useRouter } from '../../lib/next';
import { useNotificationContext } from '../notification';
import {
  UnifiedHeaderDetail,
  UnifiedHeadTag,
  DynamicInput,
} from '../../presentation';
import styles from '../shared/Dashboard.module.css';

import type {
  ProfessionField,
  ProfessionVariable,
} from '@frontend/entity/profession/types';

const EditProfessionPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const router = useRouter();
  const [dispatch] = useNotificationContext();
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<ProfessionVariable>();
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
    setDetail: (value: ProfessionVariable) => setDetail(value),
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

        <DynamicInput<ProfessionVariable, ProfessionField, 'key'>
          data={detail || VALUE_PLACEHOLDER}
          fields={INPUT_FIELDS}
          errors={errorRef.current ?? []}
          property='key'
          isLoading={isLoading}
          onSubmit={(modifiedVariables) => {
            const modifiedProfession = convertFromVariable(modifiedVariables);
            handleSubmit(modifiedProfession);
          }}
        />
      </main>
    </div>
  );
};

export default EditProfessionPage;
