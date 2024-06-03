'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Skeleton from '@mui/material/Skeleton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

type DayJS = dayjs.Dayjs;

interface Props {
  index: number;
  isLoading: boolean;
  label: string;
  keyName: string;
  value?: string;
  style?: Record<string, unknown>;
  handleInputChange: (keyName: string, value: string) => void;
}

const InputText = ({
  index,
  isLoading,
  label,
  keyName,
  value,
  style,
  handleInputChange,
}: Props) => {
  const [currentValue, setCurrentValue] = useState<DayJS | null>(null);

  const handleChange = (newValue: DayJS | null) => {
    handleInputChange(keyName, newValue?.format('YYYY-MM-DD') || '');
  };

  useEffect(() => {
    if (!isLoading && value) {
      const formattedDate = dayjs(value);
      setCurrentValue(formattedDate);
    }
  }, [isLoading, value]);

  return (
    <Box key={index} sx={style}>
      {!isLoading ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker<DayJS>
            label={label}
            value={currentValue}
            onChange={(newValue) => {
              handleChange(newValue);
            }}
            format='LL'
            slotProps={{
              textField: {
                style: { width: '100%' },
              },
            }}
          />
        </LocalizationProvider>
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default InputText;
