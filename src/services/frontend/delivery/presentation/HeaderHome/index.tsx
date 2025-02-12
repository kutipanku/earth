'use client';

import { Box, Button, Container, Typography } from '../../lib/mui';

interface Props {
  title: string;
  isLoading: boolean;
  actAdd?: string;
  actAddFunction: () => void;
}

const HeaderHomePresentation = ({
  title,
  actAdd,
  isLoading,
  actAddFunction,
}: Props) => {
  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{ width: '100%', display: 'flex', marginBottom: 1 }}
    >
      <Box sx={{ width: '70%', paddingRight: 1 }}>
        <Typography
          variant='h4'
          color='primary'
          sx={{ fontWeight: 600, marginBottom: 3 }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          width: '30%',
          display: 'flex',
          justifyContent: 'flex-end',
          alignSelf: 'center',
        }}
      >
        {actAdd && (
          <Button
            variant='contained'
            onClick={actAddFunction}
            disabled={isLoading}
            sx={{ marginBottom: '24px' }}
          >
            {actAdd}
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default HeaderHomePresentation;
