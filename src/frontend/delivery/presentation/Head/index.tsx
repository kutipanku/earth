import { TITLE, DESCRIPTION } from '@/frontend/entity/core/ui/constants';
import { Head } from '../../lib/next';

interface Props {
  title: string;
}

const UnifiedHeadTag = ({ title }: Props) => {
  return (
    <Head>
      <title>
        {title} | {TITLE} | {DESCRIPTION}
      </title>
      <meta name='description' content={DESCRIPTION} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

export default UnifiedHeadTag;
