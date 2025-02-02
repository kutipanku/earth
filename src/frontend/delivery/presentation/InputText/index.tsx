'use client';

import { dynamic, Image } from '../../lib/next';
import { useEffect, useState } from '../../lib/react';
import { Box, InputAdornment, Skeleton, TextField } from '../../lib/mui';
import type { StaticImageData } from '../../lib/next';

const EnglishIcon = dynamic(
  () =>
    import('/public/icons/gb.png').then((image) => {
      return function Icon() {
        return (
          <Image src={image} priority alt='English' width={16} height={16} />
        );
      };
    }),
  {
    ssr: false,
  }
);

const IndonesiaIcon = dynamic(
  () =>
    import('/public/icons/id.png').then((image) => {
      return function Icon() {
        return (
          <Image src={image} priority alt='Indonesia' width={16} height={16} />
        );
      };
    }),
  {
    ssr: false,
  }
);

import { useCallback } from 'react';

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

const InputText = ({
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

  const renderIcon = useCallback(() => {
    if (prefix === 'static_flag_indonesia') {
      return <IndonesiaIcon />;
    }

    if (prefix === 'static_flag_english') {
      return <EnglishIcon />;
    }

    return <></>;
  }, [prefix]);

  return (
    <Box key={index} sx={style}>
      {!isLoading ? (
        <TextField
          fullWidth
          required={isRequired}
          id={`${keyName}_input`}
          label={label}
          name={keyName}
          value={currentValue}
          error={isError}
          helperText={isError ? 'Required!' : ''}
          onChange={handleChange(keyName)}
          InputLabelProps={{
            shrink: true,
          }}
          InputProps={{
            startAdornment: prefix && (
              <InputAdornment position='start'>
                {typeof prefix === 'string' ? (
                  renderIcon()
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
