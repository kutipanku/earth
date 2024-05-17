'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  Typography,
  Box,
  Divider,
  Container,
  TextField,
  FormControl,
  Button,
  InputAdornment,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import UnifiedHeadTag from '@/presentation/Head';
import { useNotificationContext } from '@/repository/state/notification';
import styles from '@/styles/Dashboard.module.css';
import IndonesiaIcon from '@/public/icons/id.png';
import EnglishIcon from '@/public/icons/gb.png';

const TITLE = 'Add Nationality';

const InsertNationalityPage = () => {
  const [dispatch] = useNotificationContext();
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);

  const [values, setValues] = useState({
    name_id: '',
    name_en: '',
    slug: '',
    flag: '',
  });

  const handleInputChange = (prop: string) => (event: any) => {
    const newValue = event.target.value;
    setValues({ ...values, [prop]: newValue });
  };

  const handleSubmit = () => {
    const body = { ...values };
    setLoading(true);
    fetch('/api/nationality', { method: 'POST', body: JSON.stringify(body) })
      .then((res) => res.json())
      .then((responseObject) => {
        if (responseObject.error) {
          dispatch({
            type: 'OPEN_NOTIFICATION',
            payload: {
              message: `Failed to add nationality, error: ${responseObject.error}`,
              severity: 'error',
            },
          });
          setLoading(false);
          return;
        }

        router.replace('/dashboard/nationality');
        console.log('SUCCESS!', responseObject);
        dispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            message: `Successfully added new nationality: ${values.name_en}`,
            severity: 'success',
          },
        });
        setLoading(false);
      })
      .catch((err) => {
        dispatch({
          type: 'OPEN_NOTIFICATION',
          payload: {
            message: `Gagal menambahkan lokasi, error: ${err}`,
            severity: 'error',
          },
        });
        setLoading(false);
      });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={TITLE} />

      <main className={styles.main}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button
            variant='outlined'
            onClick={() => router.back()}
            startIcon={<ChevronLeftIcon />}
            sx={{ marginRight: 3, textTransform: 'none' }}
          >
            Back
          </Button>
          <Typography
            variant='h4'
            color='primary'
            sx={{ fontWeight: 600, marginBottom: 3 }}
          >
            {TITLE}
          </Typography>
        </Box>

        <Container
          maxWidth={false}
          disableGutters
          sx={{ width: '100%', marginTop: 2 }}
        >
          <Container
            maxWidth={false}
            disableGutters
            sx={{ width: '100%', display: 'flex', marginBottom: 3 }}
          >
            <Box sx={{ width: '50%', marginRight: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id='name-en-input'
                  label='Name (in English)'
                  name='name_en'
                  value={values.name_en}
                  onChange={handleInputChange('name_en')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Image
                          loading='lazy'
                          height='12'
                          width='16'
                          src={EnglishIcon}
                          alt=''
                        />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: '50%', marginLeft: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id='name-id-input'
                  label='Name (in Bahasa Indonesia)'
                  name='name_id'
                  value={values.name_id}
                  onChange={handleInputChange('name_id')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>
                        <Image
                          loading='lazy'
                          height='12'
                          width='16'
                          src={IndonesiaIcon}
                          alt=''
                        />
                      </InputAdornment>
                    ),
                  }}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
          </Container>

          <Container
            maxWidth={false}
            disableGutters
            sx={{ width: '100%', display: 'flex', marginBottom: 3 }}
          >
            <Box sx={{ width: '50%', marginRight: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id='slug-input'
                  label='Slug'
                  name='slug'
                  value={values.slug}
                  onChange={handleInputChange('slug')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position='start'>/</InputAdornment>
                    ),
                  }}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
            <Box sx={{ width: '50%', marginLeft: 1 }}>
              <FormControl fullWidth>
                <TextField
                  id='name-id-input'
                  label='Name (in Bahasa Indonesia)'
                  name='name_id'
                  value={values.name_id}
                  onChange={handleInputChange('name_id')}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  disabled={isLoading}
                />
              </FormControl>
            </Box>
          </Container>

          <Divider sx={{ marginBottom: 3 }} />

          <Container maxWidth={false} disableGutters sx={{ width: '100%' }}>
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
                alignSelf: 'center',
              }}
            >
              <Button
                variant='contained'
                onClick={handleSubmit}
                disabled={isLoading}
                sx={{ textTransform: 'none' }}
              >
                Simpan
              </Button>
            </Box>
          </Container>
        </Container>
      </main>
    </div>
  );
};

export default InsertNationalityPage;
