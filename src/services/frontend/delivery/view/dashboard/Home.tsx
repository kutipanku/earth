import Head from 'next/head';
import styles from '../shared/Home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Kutipanku App | Login</title>
        <meta name='description' content='Aplikasi Kutipan Terlengkap' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Selamat datang di <a href='https://nextjs.org'>Kutipanku</a> Dashboard
          App
        </h1>
      </main>
    </div>
  );
};

export default Home;
