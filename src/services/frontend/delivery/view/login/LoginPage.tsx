'use client';

import { useNotificationContext } from '@frontend/delivery/view/notification';
import { useEffect } from '../../lib/react';
import { Head, useRouter } from '../../lib/next';
import { Button } from '../../lib/mui';
import { signIn, useSession } from '../../lib/next-auth';
import styles from '../shared/Home.module.css';

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [notificationDispatch] = useNotificationContext();
  const doLogin = async () => {
    await signIn('google', { callbackUrl: '/dashboard' }, { prompt: 'login' });
  };

  const doInit = () => {
    fetch('/api/auth/init', { method: 'POST' })
      .then((res) => res.json())
      .then((responseObject) => {
        if (responseObject.error) {
          notificationDispatch({
            type: 'OPEN_NOTIFICATION',
            payload: {
              message: `Failed init auth, error: ${responseObject.error}`,
              severity: 'error',
            },
          });
          return;
        }

        notificationDispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            message: `Success init auth!`,
            severity: 'success',
          },
        });
      })
      .catch((err) => {
        notificationDispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            message: `Failed init auth, error: ${err}`,
            severity: 'error',
          },
        });
      });
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
        <Button onClick={doInit} sx={{ marginTop: 8 }}>
          Init
        </Button>
      </main>
    </div>
  );
};

export default LoginPage;
