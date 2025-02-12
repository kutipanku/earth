'use client';

import {
  DETAIL_PAGE_TITLE,
  DETAIL_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/nationality/constants';
import { useShowDetail } from '@frontend/usecase/nationality';
import { useEffect, useState } from '../../lib/react';
import { useNotificationContext } from '../notification';
import {
  UnifiedHeadTag,
  UnifiedHeaderDetail,
  DynamicDetail,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';

import type {
  NationalityVariable,
  NationalityField,
} from '@frontend/entity/nationality/types';

const NationalityDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<NationalityVariable>();
  const [dispatch] = useNotificationContext();

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

  useEffect(() => {
    handleGetDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={DETAIL_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={DETAIL_PAGE_TITLE} />

        <DynamicDetail<NationalityVariable, NationalityField, 'key'>
          data={detail || VALUE_PLACEHOLDER}
          fields={DETAIL_FIELDS}
          property='key'
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default NationalityDetailPage;
