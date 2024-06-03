'use client';

import type { Log } from '@/entity/log/type';
import { PAGE_TYPE, DETAIL_PAGE_TITLE } from '@/entity/log/constant';
import useDetail from '@/usecase/useDetail';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedHeaderDetail from '@/presentation/HeaderDetail';
import styles from '@/styles/Dashboard.module.css';

const NationalityDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { detail, isLoading } = useDetail<Log>({ id, name: PAGE_TYPE });

  const newData = JSON.parse(detail?.data || '{}');
  const oldData = JSON.parse(detail?.data_old || '{}');

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={DETAIL_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={DETAIL_PAGE_TITLE} />

        <pre>{JSON.stringify(newData, null, 2)}</pre>
        <pre>{JSON.stringify(oldData, null, 2)}</pre>
      </main>
    </div>
  );
};

export default NationalityDetailPage;
