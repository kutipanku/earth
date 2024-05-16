'use client';

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Typography, Box, Divider } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Button from '@mui/material/Button';
import UnifiedHeadTag from '@/presentation/head';
import { convertDateToLocaleString } from '@/lib/date';

import styles from '@/styles/Dashboard.module.css';

const TITLE = 'Nationality Detail';

const PresenceDetailPage = ({ params }: { params: { id: string } }) => {
  const [isLoading, setLoading] = useState<boolean>(false)
  const [detail, setDetail] = useState<any>({})
  const { id } = params;

  const router = useRouter();

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/nationality/${id}`)
        .then((res) => res.json())
        .then((responseObject) => {
          setLoading(false);
          setDetail(responseObject.data);
        })
    }
  }, [id]);

  if (isLoading) return <p>Loading...</p>

  return (
    <div className={styles.container}>
      <UnifiedHeadTag title={TITLE} />

      <main className={styles.main}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <Button variant="outlined" onClick={() => router.back()} startIcon={<ChevronLeftIcon />} sx={{ marginRight: 3, textTransform: 'none' }}>Kembali</Button>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 600, marginBottom: 3 }}>
            {TITLE}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Name (EN):
          </Typography>
          <Typography variant="body1" gutterBottom>
            {detail.name_en}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Name (ID):
          </Typography>
          <Typography variant="body1" gutterBottom>
            {detail.name_id}
          </Typography>
        </Box>

        <Box sx={{ width: '100%', marginBottom: 2 }}>
          <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
            Slug:
          </Typography>
          <Typography variant="body1" gutterBottom>
            /{detail.slug}
          </Typography>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />

        <Box sx={{ width: '100%', marginBottom: 2, display: 'flex' }}>
          <Box sx={{ width: '50%', marginRight: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Created At:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {convertDateToLocaleString(detail.createdAt)}
            </Typography>
          </Box>
          <Box sx={{ width: '50%', marginLeft: 1 }}>
            <Typography sx={{ paddingBottom: 0 }} variant="caption" display="block" color="primary" gutterBottom>
              Updated At:
            </Typography>
            <Typography variant="body1" gutterBottom>
              {convertDateToLocaleString(detail.updatedAt)}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ marginBottom: 3 }} />
      </main>
    </div>
  )
}

export default PresenceDetailPage;