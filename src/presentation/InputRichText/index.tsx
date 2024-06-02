'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Typography from '@mui/material/Typography';

interface Props {
  index: number;
  isLoading: boolean;
  isError: boolean;
  isRequired: boolean;
  label: string;
  keyName: string;
  value?: string;
  prefix?: string | StaticImageData;
  style?: Record<string, unknown>;
  handleInputChange: (keyName: string, value: string) => void;
}

const InputRichText = ({
  index,
  isLoading,
  isError,
  isRequired,
  label,
  keyName,
  value,
  prefix,
  style,
  handleInputChange,
}: Props) => {
  const isShowPrefix = !!prefix;

  const handleChange = (inputKey: string) => (data: string) => {
    handleInputChange(inputKey, data);
  };

  return (
    <Box key={index} sx={style}>
      {!isLoading ? (
        <>
          <Typography
            variant='caption'
            display='block'
            gutterBottom
            color='gray'
            sx={{ paddingLeft: '14px' }}
          >
            {isShowPrefix && (
              <>
                {typeof prefix === 'string' ? (
                  prefix
                ) : (
                  <Image
                    loading='lazy'
                    height='12'
                    width='16'
                    src={prefix || ''}
                    alt=''
                  />
                )}
              </>
            )}
            {label}
          </Typography>
          <CKEditor
            editor={ClassicEditor}
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
