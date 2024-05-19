'use client';

import type {
  NationalityInputFIeld,
  NationalityVariables,
} from '@/entity/nationality/type';
import {
  ADD_PAGE_TITLE,
  PAGE_TYPE,
  INPUT_FIELDS,
  INPUT_VARIABLE,
} from '@/entity/nationality/constant';
import useAdd from '@/usecase/useAdd';
import UnifiedHeaderDetail from '@/presentation/HeaderDetail';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedDynamicInputs from '@/presentation/DynamicInput';
import styles from '@/styles/Dashboard.module.css';

const InsertNationalityPage = () => {
  const { isLoading, handleSubmit } = useAdd<NationalityVariables>({
    name: PAGE_TYPE,
    identifier: 'name_en',
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={ADD_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={ADD_PAGE_TITLE} />

        <UnifiedDynamicInputs<
          NationalityVariables,
          NationalityInputFIeld,
          'key'
        >
          data={INPUT_VARIABLE}
          fields={INPUT_FIELDS}
          property='key'
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default InsertNationalityPage;
