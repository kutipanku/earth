'use client';

import { useRouter } from 'next/navigation';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';

interface Props {
  title: string;
}

const HeaderDetailPresentation = ({ title }: Props) => {
  const router = useRouter();

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
      <Button
        variant='outlined'
        onClick={() => router.back()}
        startIcon={<ChevronLeftIcon />}
        sx={{ marginRight: 3 }}
      >
        Back
      </Button>
      <Typography
        variant='h4'
        color='primary'
        sx={{ fontWeight: 600, marginBottom: 3 }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default HeaderDetailPresentation;
