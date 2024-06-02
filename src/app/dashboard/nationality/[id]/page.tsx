'use client';

import type {
  Nationality,
  NationalityDetailField,
} from '@/entity/nationality/type';
import {
  PAGE_TYPE,
  DETAIL_PAGE_TITLE,
  DETAIL_FIELDS,
  DETAIL_PLACEHOLDER,
} from '@/entity/nationality/constant';
import useDetail from '@/usecase/useDetail';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedHeaderDetail from '@/presentation/HeaderDetail';
import UnifiedDetailFields from '@/presentation/DynamicDetail';
import styles from '@/styles/Dashboard.module.css';

const NationalityDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { detail, isLoading } = useDetail<Nationality>({ id, name: PAGE_TYPE });

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={DETAIL_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={DETAIL_PAGE_TITLE} />

        <UnifiedDetailFields<Nationality, NationalityDetailField, 'key'>
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
