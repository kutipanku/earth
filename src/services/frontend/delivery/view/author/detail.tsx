'use client';

import {
  DETAIL_PAGE_TITLE,
  DETAIL_FIELDS,
  DETAIL_PLACEHOLDER,
} from '@frontend/entity/author/constants';
import { useShowDetail } from '@frontend/usecase/author';
import { useEffect, useState } from '../../lib/react';
import {
  UnifiedHeadTag,
  UnifiedHeaderDetail,
  DynamicDetail,
} from '../../presentation';
import styles from '@/styles/Dashboard.module.css';

import type {
  AuthorDetailField,
  AuthorDetail,
} from '@frontend/entity/author/types';

const AuthorDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [isLoading, setLoading] = useState<boolean>(true);
  const [detail, setDetail] = useState<AuthorDetail>();

  const { handleGetDetail } = useShowDetail({
    id,
    doSetLoading: (value: boolean) => setLoading(value),
    doSetDetail: (value: AuthorDetail) => setDetail(value),
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

        <DynamicDetail<AuthorDetail, AuthorDetailField, 'key'>
          data={detail || DETAIL_PLACEHOLDER}
          fields={DETAIL_FIELDS}
          property='key'
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default AuthorDetailPage;
