'use client';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

interface Props {
  title: string;
  actAdd: string;
  isLoading: boolean;
  actAddFunction: () => void;
}

const HeaderPresentation = ({ title, actAdd, isLoading, actAddFunction }: Props) => {

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
        <Button
          variant='contained'
          onClick={actAddFunction}
          disabled={isLoading}
          sx={{ textTransform: 'none', marginBottom: '24px' }}
        >
          {actAdd}
        </Button>
      </Box>
    </Container>
  );
};

export default HeaderPresentation;
