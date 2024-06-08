'use client';

import type {
  QuoteInputFIeld,
  QuoteVariables,
} from '@/entity/quote/type';
import {
  EDIT_PAGE_TITLE,
  PAGE_TYPE,
  INPUT_FIELDS,
  INPUT_VARIABLE,
} from '@/entity/quote/constant';
import useEdit from '@/usecase/useEdit';
import UnifiedHeaderDetail from '@/presentation/HeaderDetail';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedDynamicInputs from '@/presentation/DynamicInput';
import styles from '@/styles/Dashboard.module.css';

const EditQuotePage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { isLoading, detail, errors, handleSubmit } =
    useEdit<QuoteVariables>({
      id,
      name: PAGE_TYPE,
      identifier: 'content_en',
    });

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={EDIT_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={EDIT_PAGE_TITLE} />

        <UnifiedDynamicInputs<
          QuoteVariables,
          QuoteInputFIeld,
          'key'
        >
          data={detail || INPUT_VARIABLE}
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

export default EditQuotePage;
