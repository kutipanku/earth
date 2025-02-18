'use client';

import {
  DETAIL_PAGE_TITLE,
  DETAIL_FIELDS,
  VALUE_PLACEHOLDER,
} from '@frontend/entity/quote/constants';
import { useShowDetail } from '@frontend/usecase/quote';
import { useEffect, useState } from '../../lib/react';
import {
  UnifiedHeadTag,
  UnifiedHeaderDetail,
  DynamicDetail,
} from '../../presentation';
import { useNotificationContext } from '../notification';
import styles from '../shared/Dashboard.module.css';

import type { QuoteField, QuoteVariable } from '@frontend/entity/quote/types';

const QuoteVariablePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<QuoteVariable>();
  const [dispatch] = useNotificationContext();

  const { handleGetDetail } = useShowDetail({
    id,
    type: 'detail',
    openNotification: (severity, message) =>
      dispatch({
        type: 'OPEN_NOTIFICATION',
        payload: {
          message,
          severity,
        },
      }),
    setLoading: (value: boolean) => setLoading(value),
    setDetail: (value: QuoteVariable) => setDetail(value),
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

        <DynamicDetail<QuoteVariable, QuoteField, 'key'>
          data={detail || VALUE_PLACEHOLDER}
          fields={DETAIL_FIELDS}
          property='key'
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default QuoteVariablePage;
