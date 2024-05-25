'use client';

import type {
  Profession,
  ProfessionDetailField,
} from '@/entity/profession/type';
import {
  PAGE_TYPE,
  DETAIL_PAGE_TITLE,
  DETAIL_FIELDS,
} from '@/entity/profession/constant';
import useDetail from '@/usecase/useDetail';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedHeaderDetail from '@/presentation/HeaderDetail';
import UnifiedDetailFields from '@/presentation/DynamicDetail';
import styles from '@/styles/Dashboard.module.css';

const ProfessionDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { detail, isLoading } = useDetail<Profession>({ id, name: PAGE_TYPE });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={DETAIL_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={DETAIL_PAGE_TITLE} />

        {detail && (
          <UnifiedDetailFields<Profession, ProfessionDetailField, 'key'>
            data={detail}
            fields={DETAIL_FIELDS}
            property='key'
          />
        )}
      </main>
    </div>
  );
};

export default ProfessionDetailPage;
