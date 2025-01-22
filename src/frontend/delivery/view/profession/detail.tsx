'use client';

import {
  DETAIL_PAGE_TITLE,
  DETAIL_FIELDS,
  DETAIL_PLACEHOLDER,
} from '@frontend/entity/profession/constants';
import { useShowDetail } from '@frontend/usecase/profession';
import { useEffect, useState } from '../../lib/react';
import {
  UnifiedHeadTag,
  UnifiedHeaderDetail,
  DynamicDetail,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';

import type {
  ProfessionDetailField,
  ProfessionDetail,
} from '@frontend/entity/profession/types';

const ProfessionDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<ProfessionDetail>();

  const { handleGetDetail } = useShowDetail({
    id,
    doSetLoading: (value: boolean) => setLoading(value),
    doSetDetail: (value: ProfessionDetail) => setDetail(value),
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

        <DynamicDetail<ProfessionDetail, ProfessionDetailField, 'key'>
          data={detail || DETAIL_PLACEHOLDER}
          fields={DETAIL_FIELDS}
          property='key'
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default ProfessionDetailPage;
