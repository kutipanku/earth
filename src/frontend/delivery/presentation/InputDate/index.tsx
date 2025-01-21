'use client';

import { useEffect, useState } from '../../lib/react';
import { dayjs } from '../../lib/dayjs';
import { Box, Skeleton } from '../../lib/mui';
import {
  AdapterDayjs,
  DatePicker,
  LocalizationProvider,
} from '../../lib/mui-x-date';

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
