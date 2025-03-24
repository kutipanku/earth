'use client';

import { useEffect } from '../../lib/react';
import { Head, useRouter } from '../../lib/next';
import { Button } from '../../lib/mui';
import { signIn, useSession } from '../../lib/next-auth';
import styles from '../shared/Home.module.css';

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const doLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' }, { prompt: 'login' });
  };

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [router, session]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Kutipanku App | Login</title>
        <meta name='description' content='Aplikasi Kutipan Terlengkap' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Selamat datang di <a href='https://nextjs.org'>Kutipanku App</a>
        </h1>

        <p className={styles.description}>
          Mohon login dengan akun Google Anda yang sudah terdaftar melalui
          tombol berikut:
        </p>
        <Button variant='contained' onClick={doLogin}>
          Masuk
        </Button>
      </main>
    </div>
  );
};

export default LoginPage;
