'use client';

import type { StaticImageData } from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  index?: number;
  isLoading: boolean;
  label: string;
  value?: string;
  prefix?: string | StaticImageData;
  style?: Record<string, unknown>;
}

const DetailText = ({
  index,
  isLoading,
  label,
  value,
  prefix,
  style,
}: Props) => {
  console.warn('[DEBUG] isLoading', isLoading);
  return (
    <Box key={index} sx={style}>
      {!isLoading ? (
        <>
          <Typography
            sx={{ paddingBottom: 0 }}
            variant='caption'
            display='block'
            color='primary'
            gutterBottom
          >
            {label}:
          </Typography>
          <Typography variant='body1' gutterBottom>
            {typeof prefix === 'string' && prefix}
            {value}
          </Typography>
        </>
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default DetailText;
