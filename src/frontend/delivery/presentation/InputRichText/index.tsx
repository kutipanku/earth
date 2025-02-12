'use client';

import { dynamic } from '../../lib/next';
import { Box, Skeleton, Typography } from '../../lib/mui';

const CustomEditor = dynamic(() => import('../CustomEditor'), {
  ssr: false,
  loading: () => <Skeleton variant='rounded' height={89} />,
});

interface Props {
  index: number;
  isLoading: boolean;
  label: string;
  keyName: string;
  value?: string;
  style?: Record<string, unknown>;
  handleInputChange: (keyName: string, value: string) => void;
}

const InputRichText = ({
  index,
  isLoading,
  label,
  keyName,
  value,
  handleInputChange,
}: Props) => {
  const handleChange = (inputKey: string) => (data: string) => {
    handleInputChange(inputKey, data);
  };

  return (
    <Box key={index} sx={{ width: '100%', marginBottom: 2 }}>
      {!isLoading ? (
        <>
          <Typography
            variant='caption'
            display='block'
            gutterBottom
            color='gray'
            sx={{ paddingLeft: '14px' }}
          >
            {label}
          </Typography>
          <CustomEditor
            onReady={(editor) => {
              editor.setData(value || '');
            }}
            onChange={(_, editor) => {
              const data = editor.getData();
              handleChange(keyName)(data);
            }}
          />
        </>
      ) : (
        <Skeleton variant='rounded' height={113} />
      )}
    </Box>
  );
};

export default InputRichText;
