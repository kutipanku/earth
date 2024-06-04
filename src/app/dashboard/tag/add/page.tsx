'use client';

import type {
  TagInputFIeld,
  TagVariables,
} from '@/entity/tag/type';
import {
  ADD_PAGE_TITLE,
  PAGE_TYPE,
  INPUT_FIELDS,
  INPUT_VARIABLE,
} from '@/entity/tag/constant';
import useAdd from '@/usecase/useAdd';
import UnifiedHeaderDetail from '@/presentation/HeaderDetail';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedDynamicInputs from '@/presentation/DynamicInput';
import styles from '@/styles/Dashboard.module.css';

const AddTagPage = () => {
  const { isLoading, body, errors, handleSubmit } =
    useAdd<TagVariables>({
      name: PAGE_TYPE,
      identifier: 'name_en',
    });

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={ADD_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={ADD_PAGE_TITLE} />

        <UnifiedDynamicInputs<
          TagVariables,
          TagInputFIeld,
          'key'
        >
          data={body || INPUT_VARIABLE}
          fields={INPUT_FIELDS}
          errors={errors}
          property='key'
          isLoading={isLoading}
          onSubmit={handleSubmit}
        />
      </main>
    </div>
  );
};

export default AddTagPage;
