'use client';

import { Box, Typography, Skeleton } from '../../lib/mui';
import type { StaticImageData } from '../../lib/next';

interface Props {
  index?: number;
  isLoading: boolean;
  label: string;
  value?: string;
  prefix?: string | StaticImageData;
  style?: Record<string, unknown>;
}

const DetailText = ({ index, isLoading, label, value, prefix }: Props) => {
  return (
    <Box key={index} sx={{ width: '100%', marginBottom: 2 }}>
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
