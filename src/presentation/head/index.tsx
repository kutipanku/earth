import Head from 'next/head';
import { TITLE, DESCRIPTION } from '@/entity/meta/constant';

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
