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
  style?: Record<string, unknown>;
}

const DetailRichText = ({
  index,
  isLoading,
  label,
  value,
  style,
}: Props) => {
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
            <span dangerouslySetInnerHTML={{ __html: value || '' }}></span>
          </Typography>
        </>
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default DetailRichText;
