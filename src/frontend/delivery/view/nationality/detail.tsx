'use client';
import { useEffect, useState } from '../../lib/react';
import type {
  NationalityDetailField,
  NationalityDetail,
} from '@frontend/entity/nationality/types';
import {
  DETAIL_PAGE_TITLE,
  DETAIL_FIELDS,
  DETAIL_PLACEHOLDER,
} from '@frontend/entity/nationality/constants';
import { useShowDetail } from '@frontend/usecase/nationality';
import {
  UnifiedHeadTag,
  UnifiedHeaderDetail,
  DynamicDetail,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';

const NationalityDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<NationalityDetail>();

  const { handleGetDetail } = useShowDetail({
    id,
    doSetLoading: (value: boolean) => setLoading(value),
    doSetDetail: (value: NationalityDetail) => setDetail(value),
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

        <DynamicDetail<NationalityDetail, NationalityDetailField, 'key'>
          data={detail || DETAIL_PLACEHOLDER}
          fields={DETAIL_FIELDS}
          property='key'
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default NationalityDetailPage;
