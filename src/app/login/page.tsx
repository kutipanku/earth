'use client';

import Head from 'next/head';
import Button from '@mui/material/Button';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useNotificationContext } from '@/repository/state/notification';

import styles from '@/styles/Home.module.css';

const LoginPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [notificationDispatch] = useNotificationContext();
  const doLogin = async () => {
    console.warn('[DEBUG] session', session);

    if (session === null) {
      signIn('google', { callbackUrl: '/home' }, { prompt: 'login' });
      return;
    }

    notificationDispatch({
      type: 'OPEN_NOTIFICATION',
      payload: {
        message: `Sesi login Anda masih tersimpan, logout jika ingin menggunakan akun lain.`,
        severity: 'success',
      },
    });

    router.push('/home');
  };

  const doLogout = () => {
    signOut();
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
        <Button
          variant='contained'
          onClick={doLogin}
          sx={{ textTransform: 'none' }}
        >
          Masuk
        </Button>
        <Button onClick={doInit} sx={{ textTransform: 'none' }}>
          Init
        </Button>
        <Button onClick={doLogout} sx={{ textTransform: 'none' }}>
          Logout
        </Button>
      </main>
    </div>
  );
};

export default LoginPage;
