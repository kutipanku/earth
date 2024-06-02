'use client';

import type {
  ProfessionInputFIeld,
  ProfessionVariables,
} from '@/entity/profession/type';
import {
  EDIT_PAGE_TITLE,
  PAGE_TYPE,
  INPUT_FIELDS,
  INPUT_VARIABLE,
} from '@/entity/profession/constant';
import useEdit from '@/usecase/useEdit';
import UnifiedHeaderDetail from '@/presentation/HeaderDetail';
import UnifiedHeadTag from '@/presentation/Head';
import UnifiedDynamicInputs from '@/presentation/DynamicInput';
import styles from '@/styles/Dashboard.module.css';

const EditProfessionPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { isLoading, handleSubmit, errors, detail } =
    useEdit<ProfessionVariables>({
      id,
      name: PAGE_TYPE,
      identifier: 'name_en',
    });

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={EDIT_PAGE_TITLE} />

      <main className={styles.main}>
        <UnifiedHeaderDetail title={EDIT_PAGE_TITLE} />

        <UnifiedDynamicInputs<ProfessionVariables, ProfessionInputFIeld, 'key'>
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

export default EditProfessionPage;
