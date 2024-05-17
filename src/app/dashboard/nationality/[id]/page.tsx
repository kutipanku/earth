'use client';

import type {
  Nationality,
  NationalityDetailField,
} from '@/entity/nationality/type';
import {
  PAGE_TYPE,
  DETAIL_PAGE_TITLE,
  DETAIL_FIELDS,
} from '@/entity/nationality/constant';
import useDetail from '@/usecase/useDetail';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedHeaderDetail from '@/presentation/HeaderDetail';
import UnifiedDetailFields from '@/presentation/DynamicDetail';
import styles from '@/styles/Dashboard.module.css';

const PresenceDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { detail, isLoading } = useDetail<Nationality>({ id, name: PAGE_TYPE });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={DETAIL_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={DETAIL_PAGE_TITLE} />

        {detail && (
          <UnifiedDetailFields<Nationality, NationalityDetailField, 'key'>
            data={detail}
            fields={DETAIL_FIELDS}
            property='key'
          />
        )}
      </main>
    </div>
  );
};

export default PresenceDetailPage;
