'use client';

import { useRouter } from '../../lib/next';
import { Box, Button, Typography, Skeleton } from '../../lib/mui';
import type { SelectOption } from '@frontend/entity/shared/types';
import type { StaticImageData } from '../../lib/next';

interface Props {
  entity: string;
  label: string;
  isLoading: boolean;
  index?: number;
  value?: SelectOption;
  prefix?: string | StaticImageData;
  style?: Record<string, unknown>;
}

const DetailAutocomplete = ({
  entity,
  index,
  isLoading,
  label,
  value,
  prefix,
}: Props) => {
  const router = useRouter();
  const name = value?.name || value?.name_eng || '';

  const redirectTo = () => {
    router.push(`/dashboard/${entity}/${value?.id}`);
  };

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
          <Button variant='text' onClick={redirectTo}>
            <Typography variant='body1' gutterBottom>
              {typeof prefix === 'string' && prefix}
              {name}
            </Typography>
          </Button>
        </>
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default DetailAutocomplete;
