'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  index: number;
  isLoading: boolean;
  label: string;
  keyName: string;
  value?: string;
  prefix?: string | StaticImageData;
  handleInputChange: (keyName: string, value: string) => void;
}

const InputText = ({
  index,
  isLoading,
  label,
  keyName,
  value,
  prefix,
  handleInputChange,
}: Props) => {
  const [currentValue, setCurrentValue] = useState(value || '');

  const handleChange = (inputKey: string) => (event: any) => {
    const newValue = event.target.value;
    setCurrentValue(newValue);
    handleInputChange(inputKey, newValue);
  };

  useEffect(() => {
    if (!isLoading) {
      setCurrentValue(value || '');
    }
  }, [isLoading, value]);

  return (
    <Box key={index} sx={{ width: '50%', marginBottom: 2, paddingRight: 1 }}>
      {!isLoading ? (
        <TextField
          fullWidth
          id={`${keyName}_input`}
          label={label}
          name={keyName}
          value={currentValue}
          onChange={handleChange(keyName)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: prefix && (
              <InputAdornment position='start'>
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
              </InputAdornment>
            ),
          }}
          disabled={isLoading}
        />
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default InputText;
