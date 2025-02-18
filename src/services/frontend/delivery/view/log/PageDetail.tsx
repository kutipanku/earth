'use client';

import {
  DETAIL_FIELDS,
  DETAIL_PAGE_TITLE,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/log/constants';
import { useShowDetail } from '@frontend/usecase/log';
import { useEffect, useState } from '../../lib/react';
import {
  UnifiedHeadTag,
  UnifiedHeaderDetail,
  DynamicDetail,
} from '../../presentation';
import { useNotificationContext } from '../notification';
import styles from '../shared/Dashboard.module.css';

import type { LogField, LogVariable } from '@frontend/entity/log/types';

const LogVariablePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<LogVariable>();
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
    setDetail: (value: LogVariable) => setDetail(value),
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

        <DynamicDetail<LogVariable, LogField, 'key'>
          data={detail || VALUE_PLACEHOLDER}
          fields={DETAIL_FIELDS}
          property='key'
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default LogVariablePage;
