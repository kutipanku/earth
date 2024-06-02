'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Skeleton from '@mui/material/Skeleton';

interface Props {
  index: number;
  keyName: string;
  entity: string;
  isLoading: boolean;
  label: string;
  optionLabel: string;
  value?: string;
  style?: Record<string, unknown>;
  handleInputChange: (keyName: string, value: string) => void;
}

interface Options {
  id: string;
  name_en: string;
  name_id: string;
}

const InputAutocomplete = ({
  index,
  keyName,
  entity,
  isLoading,
  label,
  optionLabel,
  value,
  style,
  handleInputChange,
}: Props) => {
  const optionsRef = useRef([]);
  const [currentValue, setCurrentValue] = useState<Options>();
  const [isLoadingField, setIsLoadingField] = useState(true);

  useEffect(() => {
    if (!optionsRef.current.length) {
      fetch(`/api/${entity}/list`)
        .then((res) => res.json())
        .then((options) => {
          optionsRef.current = options.data;
          setIsLoadingField(false);
        });
    } else {
      if (value) {
        const defaultCurrentValue = optionsRef.current.find(
          (option: { id: string }) => option.id === value
        );

        setCurrentValue(defaultCurrentValue);
      }
    }
  }, [entity, value]);

  const handleChange = (newValue: Options) => {
    setCurrentValue(currentValue);
    handleInputChange(keyName, newValue.id);
  };

  return (
    <Box key={index} sx={style}>
      {!isLoading && !isLoadingField ? (
        <Autocomplete
          fullWidth
          id={`approvers-${index}`}
          multiple={index === 0}
          options={optionsRef.current}
          // @ts-expect-error need to overide options typed objec
          getOptionLabel={(option) => option[optionLabel]}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          onChange={(_, value) => handleChange(value as unknown as Options)}
          defaultValue={currentValue}
          renderInput={(params) => <TextField {...params} label={label} />}
        />
      ) : (
        <Skeleton variant='rounded' height={56} />
      )}
    </Box>
  );
};

export default InputAutocomplete;
